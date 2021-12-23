// Canvas settings
        const canvas = document.getElementById("hero-lightpass");
        const context = canvas.getContext("2d");

        canvas.width=2000;
        canvas.height=1000;


        // Preloading images to drastically improve performance
        //const currentFrame = index => (`https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`);
        //shaun the sheep
        //const currentFrame = index => (`img2/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`);
        const currentFrame = index => (`eye/frame_${index.toString().padStart(2, '0')}_delay-0.1s.gif`);
        //const frameCount = 17; // There 17 images for that animation-sequence to load
        const frameCount = 29
        const images = [];

        const preloadImages = () => {
            for (let i = 1; i < frameCount; i++) {
                images[i] = new Image(); // This is functionally equivalent to document.createElement('img').
                images[i].src = currentFrame(i);
            }
        };

        preloadImages();


        // Draw the first image
        const img = new Image();
        img.src = currentFrame(1);
        img.onload = function(){
            context.drawImage(img, 0, 0, 2000, 1000);
        }


        // Scroll interactions
        const html = document.getElementsByTagName('html');

        window.addEventListener('scroll', () => {
            const scrollTop = html[0].scrollTop;
            // console.log('scrollTop: ', scrollTop);
            // console.log('html.scrollHeight: ', html[0].scrollHeight);
            // console.log('window.innerHeight: ', window.innerHeight);
            const maxScrollTop = html[0].scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );
            // console.log('FrameIndex', frameIndex);

            requestAnimationFrame(() => context.drawImage(images[frameIndex + 1], 0, 0, 2000, 1000));

        });
