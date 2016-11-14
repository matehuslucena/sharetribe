import { Component } from 'react';
import r, { div, button } from 'r-dom';
import SideWinder from '../../composites/SideWinder/SideWinder';

class ListingEditAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      wrapper: null,
    };
  }
  componentDidMount() {
    this.setState({
      wrapper: document.getElementById('sidewinder-wrapper'),
    });
  }
  render() {
    console.debug('ListingEditAvailability.render() wrapper:', this.state.wrapper);
    return div([
      button({
        style: {
          float: 'right',
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setState({ isOpen: !this.state.isOpen});
        }
      }, this.state.isOpen ?  'Hide side menu' : 'Show side menu'),
      this.state.wrapper ? r(SideWinder, {
        wrapper: this.state.wrapper,
        width: 600,
        isOpen: this.state.isOpen,
        onClose: () => this.setState({ isOpen: false }),
      }, [
        div({
          style: {
            height: '100%',
            backgroundColor: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }, 'Edit listing availability'),
      ]) : null,
    ]);
  }
};

export default ListingEditAvailability;
