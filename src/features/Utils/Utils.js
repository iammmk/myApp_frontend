export const timeAgo = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - timestamp) / 1000);

  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hr`;
  }

  const days = Math.floor(hours / 24);
  return `${days} days`;
};

export const defaultProfilePhoto =
  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
export const defaultCoverPhoto =
  "https://img.freepik.com/premium-photo/background-gradient-black-overlay-abstract-background-black-night-dark-evening-with-space-text-background_661047-2507.jpg?w=360";
