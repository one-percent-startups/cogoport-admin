import {
  OverlayScrollbarsComponent,
} from 'overlayscrollbars-react';
import classNames from '../utils/classname';


export default function Scrollbar({
  options,
  style,
  className,
  autoHide = 'scroll',
  ...props
}) {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: classNames('os-theme-thin', className),
        scrollbars: {
          autoHide: autoHide,
        },
        ...options,
      }}
      style={style}
      {...props}
    />
  );
}
