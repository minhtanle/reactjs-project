import { memo } from 'react';

const Error404 = memo(() => {
  return(
    <section>
      <div style={{color: "red"}}>
        <h1>404 Not Found</h1>
      </div>
    </section>
  )    
})

export default Error404