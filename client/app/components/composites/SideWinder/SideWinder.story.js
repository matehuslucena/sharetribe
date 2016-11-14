import { Component } from 'react';
import r, { div, button, p } from 'r-dom';
import withProps from '../../Styleguide/withProps';
import SideWinder from './SideWinder';

const { storiesOf } = storybookFacade;

class WinderWinder extends Component {
  constructor(props, context) {
    super(props.context);
    this.state = { isOpen: false };
  }
  render() {
    return div({ className: 'WinderWinder' }, [
      button({
        onClick: () => this.setState({ isOpen: !this.state.isOpen }),
      }, this.state.isOpen ? 'Hide SideWinder' : 'Show SideWinder'),
      this.state.isOpen ? r(SideWinder, this.props, [
        p('Lorem ipsum')
      ]) : null
    ]);
  }
}

storiesOf('General')
  .add('SideWinder', () => (
    withProps(WinderWinder, {
      wrapper: document.getElementById('root'),
      width: 300,
    })));
