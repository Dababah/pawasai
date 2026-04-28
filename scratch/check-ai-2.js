const { useChat } = require('@ai-sdk/react');
// We can't call a hook outside of a component, but we can inspect the function if it's a wrapper.
console.log(useChat.toString());
