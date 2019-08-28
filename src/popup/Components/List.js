import React, {Component} from 'react';
import SmoothScroll from 'smooth-scrollbar';

class List extends Component {
  state = {
    isFetching: true,
    collection: []
  }

  componentDidMount() {
    chrome.storage.sync.get('collection', result => {
      this.setState({
        isFetching: false,
        collection: result.collection || []
      });
    });

    Scrollbar.init(document.getElementById('root'));
  }

  handleRemove = (sku) => {
    let index = 0;

    this.state.collection.find((element,idx) => {
      if (element.sku === sku) {
        index = idx;
        return true;
      }
    });

    this.state.collection.splice(index,1);

    this.setState({
      collection: this.state.collection
    });

    chrome.storage.sync.set({'collection': this.state.collection});

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {sku: sku}, () => {});
    });
  }

  render() {
      return (
        <div>
            {this.state.isFetching ? 'Loading...' : <ListBlock onRemoveItem={this.handleRemove} collection={this.state.collection}/>}
        </div>
      )
  }
}

class ListBlock extends Component {
  renderList = data => {
    if (!data.length){
      return (
        <div className="fs-16 fw-sbold text-center">Add item in your favorite list</div>
      )
    }
    return data.map((item, idx) =>
      <div className="row card" key={idx}>
        <div className="col-3"><img className="brand-img" src={'https://a.lmcdn.ru/img389x562/' + item.image}/></div>
        <div className="col-9">
          <div className="fs-18 fw-bold">{item.brand}</div>
          <div className="fs-16 fw-sbold brand-price">{item.price.toLocaleString('en')}</div>
          <div className="fs-16 fw-bold red pointer" onClick={() => this.handleRemove(item.sku)}>Remove</div>
        </div>
      </div>
    ) 
  }

  render() {
      return (
        <div>
          {this.renderList(this.props.collection)}
        </div>
      )
  }

  handleRemove = (sku) => {
    this.props.onRemoveItem(sku);
  }
}

export default List;

