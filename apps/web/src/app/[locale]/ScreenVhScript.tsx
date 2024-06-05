'use client'

import Script from 'next/script'

const ScreenVhScript = ({ nonce }: { nonce: string }) => {
  return (
    <Script id="script-for-iphone-cross-browsing" type="text/javascript" nonce={nonce} strategy="beforeInteractive">
      {`
              function setScreenSize() {
                var vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh',vh+"px");
              }
              window.addEventListener('resize', setScreenSize);
              setScreenSize();
            `}
    </Script>
  )
}

export default ScreenVhScript
