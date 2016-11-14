/* eslint-disable no-console */
// TODO: remove ^

import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import r, { div } from 'r-dom';

import css from './SideWinder.css';

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

const SideWinderContent = (props) => {
  console.log('SideWinderContent render');
  return div({ className: css.content }, props.children);
};

class SideWinder extends Component {
  constructor(props, context) {
    console.debug('Sidewinder.constructor()', props.isOpen);
    super(props, context);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    console.debug('SideWinder.componentDidMount()', this.props.isOpen);

    this.props.wrapper.classList.add(css.wrapper);

    this.el = document.createElement('div');
    this.el.style.width = `${this.props.width}px`;
    this.el.style.right = `-${this.props.width}px`;
    this.props.wrapper.appendChild(this.el);
    this.update();
  }
  componentDidUpdate() {
    console.debug('SideWinder.componentDidUpdate()', this.props.isOpen);
    this.update();
  }
  componentWillUnmount() {
    console.debug('SideWinder.componentWillUnmount()', this.props.isOpen);
    ReactDOM.unmountComponentAtNode(this.el);
    this.props.wrapper.removeChild(this.el);
    this.props.wrapper.classList.remove(css.wrapper);
    this.props.wrapper.classList.remove(css.wrapperOpen);

    if (this.stopWidthSync) {
      this.stopWidthSync();
      this.stopWidthSync = null;
    }
  }
  update() {
    console.debug('SideWinder.update()', this.props.isOpen);
    const isOpen = this.props.isOpen;

    if (isOpen) {
      this.props.wrapper.classList.add(css.wrapperOpen);
      this.props.wrapper.style.right = `${this.props.width}px`;
    } else {
      this.props.wrapper.classList.remove(css.wrapperOpen);
      this.props.wrapper.style.right = '0px';
    }

    if (isOpen && !this.stopWidthSync) {
      this.stopWidthSync = syncWindowWidthTo(this.props.wrapper);
    } else if (!isOpen && this.stopWidthSync) {
      this.stopWidthSync();
      this.stopWidthSync = null;
    } else {
      console.debug('already or not yet syncing:', isOpen, typeof this.stopWidthSync);
    }

    this.el.className = css.root;
    ReactDOM.render(r(SideWinderContent, null, this.props.children), this.el);
  }

  // TODO: shouldComponentUpdate() {}

  render() {
    console.debug('SideWinder.render()', this.props.isOpen);
    return null;
  }
}

SideWinder.propTypes = {
  wrapper: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  width: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default SideWinder;
