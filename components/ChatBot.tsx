import { useEffect } from 'react';

const ChatbotEmbed = () => {
    const chatbotId = 'IkZ5RyojCE2icYF7czBSV';
    const domain = 'www.chatbase.co';

  useEffect(() => {
    const windowWithChatbotConfig: any = window;
    windowWithChatbotConfig.embeddedChatbotConfig = {
      chatbotId,
      domain,
    };

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', chatbotId);
    script.setAttribute('domain', domain);
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
};

export default ChatbotEmbed;
