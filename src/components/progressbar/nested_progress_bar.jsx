import './nested_progress_bar.css';
import ProgressBar from 'react-customizable-progressbar';
export default function NestedProgressBar() {
  return (
    <div className="mainIndicator">
      <ProgressBar
        className="first-circle"
        radius={64}
        progress={90}
        strokeColor="#ffbc38"
        pointerRadius={3}
        pointerStrokeWidth={0}
        strokeWidth={8}
        trackStrokeWidth={8}
        pointerStrokeColor="#7bcd5c"
        initialAnimationDelay={1000}
        initialAnimation={true}
        trackTransition=".1s ease"
        transition="1s ease"
      >
        <div className="indicator">
          <ProgressBar
            radius={44}
            className="second-circle"
            progress={78}
            strokeWidth={8}
            trackStrokeWidth={8}
            strokeColor="#184477"
            pointerRadius={3}
            pointerStrokeWidth={0}
            pointerStrokeColor="#7bcd5c"
            initialAnimationDelay={1000}
            initialAnimation={true}
            trackTransition=".1s ease"
            transition="1s ease"
          >
            <div className="indicator-2">
              <ProgressBar
                radius={25}
                className="third-circle"
                progress={30}
                strokeColor="#d84639"
                strokeWidth={8}
                trackStrokeWidth={8}
                pointerRadius={3}
                pointerStrokeWidth={0}
                pointerStrokeColor="#7bcd5c"
                initialAnimationDelay={1000}
                initialAnimation={true}
                trackTransition=".1s ease"
                transition="1s ease"
              />
            </div>
          </ProgressBar>
        </div>
      </ProgressBar>
    </div>
  );
}
