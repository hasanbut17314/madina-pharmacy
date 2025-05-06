import React, { useEffect } from 'react';

const Chatbot = () => {
    useEffect(() => {
        const scriptInject = document.createElement('script');
        scriptInject.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
        scriptInject.async = true;

        scriptInject.onload = () => {
            const scriptCustom = document.createElement('script');
            scriptCustom.src = "https://files.bpcontent.cloud/2025/05/05/15/20250505151438-YOBFXER0.js";
            scriptCustom.async = true;
            document.body.appendChild(scriptCustom);
        };

        document.body.appendChild(scriptInject);

        return () => {
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (
                    script.src === "https://cdn.botpress.cloud/webchat/v2.4/inject.js" ||
                    script.src === "https://files.bpcontent.cloud/2025/05/05/15/20250505151438-YOBFXER0.js"
                ) {
                    document.body.removeChild(script);
                }
            });
        };
    }, []);

    return null;
};

export default Chatbot;