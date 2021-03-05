import React from 'react';

interface IProps {
  marker: {
    id: number,
    time: number,
    color: string,
    title: string,
    endTime: number
  };
  duration: number;
  onMarkerClick: (marker: object) => void;
}

function Marker(props: IProps) {
  const { marker, duration, onMarkerClick } = props;
  const { time, color, title, endTime } = marker;
  const id = String(marker.id);

  const getPosition = () => {
    if (duration) {
      const percent = (time <= duration) ? time / duration : 1;
      return `calc(${percent * 100}% - 2px)`;
    }
    return '-9999px';
  };

  const getWidth = (time, endTime) => {
    const playerWidth = document.getElementById('player-progress');
    if (endTime && playerWidth) {
      const width = Math.abs(Math.floor(endTime - time)) / duration * (playerWidth.offsetWidth);
      return `${width}px`;
    };
    return '4px';
  }

  return (
    <i
      id={id}
      className="react-video-marker"
      title={title}
      style={{
        background: color,
        left: getPosition(),
        ...(endTime && { width: getWidth(time, endTime) })
      }}
      onClick={() => {
        onMarkerClick(marker);
      }}
    />
  );
}

export default Marker;
