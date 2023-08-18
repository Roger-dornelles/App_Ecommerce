import React from 'react';
import {AreaImage} from './styles';

interface ImageProps {
  image: string;
  width: number;
  height: number;
}

const Image = ({image, width, height}: ImageProps) => {
  return <AreaImage source={{uri: image}} width={width} height={height} />;
};

export default Image;
