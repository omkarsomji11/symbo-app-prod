import React from 'react';
import { connect } from 'react-redux';
import ImageCard from './ImageCard';
import Pdp from './Pdp';
import './main.css';
import { fetchData, getPdpData, emptyPdpData, selectToCompare, updateCompare } from '../actions';
import _ from 'lodash';

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked: false};
        this.getPdpData = this.getPdpData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchData();
    }
    getPdpData(data) {
        this.props.getPdpData(data).then(() => {
            this.props.history.push('/pdp');
        });
        return null;
    }
    handleChange(data, event) {
        this.setState({checked: !this.state.checked});
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        if ( this.props.selectedData.length > 2) {
            alert('You can add only 3 products to compare....');
            event.preventDefault();
            //this.props.updateCompare(data);
        } else{

            if(value === true) {
                this.props.selectToCompare(data);
                this.findAncestor(event.target, 'article').classList.add('highlight');
                if ( this.props.selectedData.length >= 1) {
                    this.refs.compareBtn.style.display = 'block';
                }
            } else {
                this.findAncestor(event.target, 'article').classList.remove('highlight');
                this.props.updateCompare(data);
            }
        } 
        return null;    
    }
    findAncestor(el, sel) {
        while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
        return el;
    }
    renderList() {
        const { browseData } = this.props;

        const getData = _.get(browseData, 'data.content', []);
        console.log("browseData", getData);
        return getData.map((data, index) => {
            return (
                <article className="card" key={index} >
                    <ImageCard imageData={data} />
                    <div className="text">
                        <p><b>Plan :</b> {_.get(data, 'plan.planName', 'N/A')}</p>
                        <p><b>Insurance Provider Name:</b> {_.get(data, 'plan.insuranceProviderName', 'N/A')}</p>
                        <p><b>Sum Insured :</b> {_.get(data, 'sumInsured', 'N/A')}</p>
                        <p><b>Premium :</b> {_.get(data, 'totalAmount.amount', 'N/A')}</p>
                        <button type="button" className="btn btn-cyan" onClick={() => this.getPdpData(data.plan.id)}>View Detail </button>
                        <div className="checkbox" style={{marginTop: "20px"}}>
                            <label>
                                <input type="checkbox" defaultChecked={this.state.checked} onChange={(event) => this.handleChange(data.plan.id, event)}/>
                                &nbsp;Select To Compare
                            </label>
                        </div>
                    </div>
                </article>
            );
        });
    }
    render() {
        return (<div className="container-full">
           <button ref="compareBtn" style={{backgroundColor:"magenta",color:"white", display: "none"}} onClick={() => {this.props.history.push('/Compare');return null;}}>Compare the Products </button>
            <main className="cards">
                {this.renderList()}
            </main>
        </div>);
    }
}

const maspStateToProps = (state) => {
    return {
        browseData: state.browse.data,
        selectedData: state.selectedData
    };
}
export default connect(maspStateToProps, { fetchData, getPdpData, emptyPdpData, selectToCompare, updateCompare })(Browse);