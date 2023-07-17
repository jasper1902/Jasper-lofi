interface Window {
  onYouTubeIframeAPIReady: () => void;
}

// youtube.d.ts
interface Window {
  onYouTubeIframeAPIReady: () => void;
  YT: any; // Replace 'any' with the specific type for the YT object if available
}
