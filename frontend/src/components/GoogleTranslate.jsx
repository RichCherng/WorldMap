import React from 'react';

const EmbeddedPage = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe 
        src={"https://translate.google.com/?hl=en&sl=en&tl=zh-CN&text=I%20am%20american&op=translate"} 
        title="Embedded Content" 
        style={{ border: 'none', width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default EmbeddedPage;