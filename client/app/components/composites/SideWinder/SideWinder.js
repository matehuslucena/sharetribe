import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import r, { div } from 'r-dom';

const syncWindowWidthTo = (el) => {
  /* eslint-disable no-param-reassign */
  console.debug('start syncing window width to wrapper:', el);

  const originalWidth = el.style.width;
  const update = () => {
    console.debug('update wrapper width to:', window.innerWidth);
    el.style.width = `${window.innerWidth}px`;
  };
  update();
  window.addEventListener('resize', update);

  return () => {
    console.debug('stop syncing window width to wrapper:', el);
    window.removeEventListener('resize', update);
    el.style.width = originalWidth;
  };

  /* eslint-enable no-param-reassign */
};

function SideWinderContent(props) {
  console.log('content props:', props);
  return div({
    className: 'SideWinderContent',
    style: { width: props.width },
  }, props.children);
}

class SideWinder extends Component {
  componentDidMount() {
    console.log('winder props:', this.props);
    const el = document.createElement('div');
    el.classList.add('SideWinder');
    this.props.wrapper.appendChild(el);
    ReactDOM.render(r(SideWinderContent, this.props, this.props.children), el);
    this.el = el;
    this.stopWidthSync = syncWindowWidthTo(this.props.wrapper);
  }
  componentWillUnmount() {
    this.stopWidthSync();
    ReactDOM.unmountComponentAtNode(this.el);
    this.props.wrapper.removeChild(this.el);
  }
  // TODO: shouldComponentUpdate() {}
  render() {
    return null;
  }
}

SideWinder.propTypes = {
  wrapper: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  width: PropTypes.number,
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default SideWinder;
