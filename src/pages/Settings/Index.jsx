import React, { useRef, useState } from 'react';
import { fileStore } from "@/configs/firebase";
import { collection, addDoc, setDoc, doc, onSnapshot, deleteDoc, getDoc , getDocs  } from "firebase/firestore";

const VideoStreamApp = () => {
  const [role, setRole] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomList, setRoomList] = useState([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStreamRef = useRef(null);

  // Cấu hình ICE Server
  const config = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  // Tạo Room mới
  const createRoom = async () => {
    const roomRef = await addDoc(collection(fileStore, "rooms"), { createdAt: new Date() }); 
    setRoomId(roomRef.id);

    peerConnection.current = new RTCPeerConnection(config);

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream));
    localVideoRef.current.srcObject = localStream;
    localStreamRef.current = localStream;

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(collection(fileStore, `rooms/${roomRef.id}/iceCandidates`), event.candidate.toJSON());
      }
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    await setDoc(doc(fileStore, "rooms", roomRef.id), { offer });

    onSnapshot(doc(fileStore, "rooms", roomRef.id), async (snapshot) => {
      const data = snapshot.data();
      if (data && data.answer && !peerConnection.current.remoteDescription) {
        const rtcAnswer = new RTCSessionDescription(data.answer);
        await peerConnection.current.setRemoteDescription(rtcAnswer);
      }
    });

    onSnapshot(collection(fileStore, `rooms/${roomRef.id}/iceCandidatesViewer`), async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          await peerConnection.current.addIceCandidate(candidate);
        }
      });
    });
  };

  // Viewer tham gia phòng
  const joinRoom = async () => {
    const roomRef = doc(fileStore, "rooms", roomId); // Đảm bảo roomRef là document reference
    peerConnection.current = new RTCPeerConnection(config);
  
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
  
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(collection(fileStore, `rooms/${roomId}/iceCandidatesViewer`), event.candidate.toJSON());
      }
    };
  
    // Sửa lại phần này để lấy đúng document
    const roomSnapshot = await getDoc(roomRef); // Đảm bảo dùng getDoc cho document reference
    const offer = roomSnapshot.data()?.offer;
    if (offer) {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
  
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream));
      localVideoRef.current.srcObject = localStream;
  
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      await setDoc(roomRef, { answer }, { merge: true });
    }
  
    onSnapshot(collection(fileStore, `rooms/${roomId}/iceCandidates`), async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          await peerConnection.current.addIceCandidate(candidate);
        }
      });
    });
  };
  // Dừng chia sẻ video và xóa roomId
  const stopSharing = async () => {
    if (peerConnection.current) {
      // Dừng video và audio
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;

      // Xóa roomId từ Firebase
      await deleteDoc(doc(fileStore, "rooms", roomId));

      // Dọn dẹp state
      setRoomId('');
      peerConnection.current.close();
      peerConnection.current = null;
    }
  };

  // Lấy danh sách các phòng từ Firebase
  const fetchRooms = async () => {
    const roomSnapshot = await getDocs(collection(fileStore, "rooms"));
    const rooms = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRoomList(rooms);
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Cameramen') {
      createRoom();
    }
  };

  return (
    <div>
      <h1>Video Streaming App</h1>
      {!role && (
        <div>
          <button onClick={() => handleRoleSelection('Cameramen')}>Cameramen</button>
          <button onClick={() => handleRoleSelection('Viewer')}>Viewer</button>
        </div>
      )}
      {role === 'Cameramen' && (
        <div>
          <h2>Room ID: {roomId}</h2>
          <video ref={localVideoRef} autoPlay muted />
          <button onClick={stopSharing}>Stop Sharing</button>
        </div>
      )}
      {role === 'Viewer' && (
        <div>
          <h2>Available Rooms</h2>
          <ul>
            {roomList.map((room) => (
              <li key={room.id}>
                <button onClick={() => setRoomId(room.id)}>Join Room {room.id}</button>
              </li>
            ))}
          </ul>
          <button onClick={fetchRooms}>Refresh Room List</button>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
          <video ref={remoteVideoRef} autoPlay />
        </div>
      )}
    </div>
  );
};

export default VideoStreamApp;