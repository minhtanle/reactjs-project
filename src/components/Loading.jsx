import { memo } from 'react';

const Loading = memo(() => {
  return (
    <section>
      <span className="loading loading-spinner loading-md"></span>
    </section>
  )
})

export default Loading