import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageCard from './ImageCard';
import _ from 'lodash';
import './main.css';
import {emptySelectedData} from '../actions';

class Compare extends React.Component{
    constructor(props) {super(props);}
    componentWillUnmount(){
        this.props.emptySelectedData();
    }
    renderList() {
        const { selectedData } = this.props;
        return selectedData.map((data, index) => {
            return (
                <article className="card" key={index} >
                    <ImageCard imageData={data} />
                    <div className="text">
                        <p><b>Plan : </b> {_.get(data, 'plan.planName', 'N/A')}</p>
                        <p><b>Insurance Provider Name : </b> {_.get(data, 'plan.insuranceProviderName', 'N/A')}</p>
                        <p><b>Sum Insured : </b> {_.get(data, 'sumInsured', 'N/A')}</p>
                        <p><b>Premium : </b> {_.get(data, 'totalAmount.amount', 'N/A')}</p>
                        <p><b>Travel Features : </b>{this.createMedicalBenefits(data)}</p>
                        <p><b>Medical Features </b>{this.createMedicalBenefits(data)}</p>
                    </div>
                </article>
            );
        });
    }
    createTravelBenefits(data) {

        const travelData = _.get(data, "plan.planBenefitCategories.TravelFeatures", []);
        return (
            <p className="counterclass">
                {this.createRows(travelData)}
            </p>
        );
    }

    createMedicalBenefits(data) {
        const medicalFeatures = _.get(data, "plan.planBenefitCategories.MedicalFeatures", []);
        return (
            <p className="counterclass">
            {this.createRows(medicalFeatures)}
        </p>
        );
    }

    createRows(data) {
        return data.map((item, index) => {
            return (<span key={index}>{` ${item.benefitName}`}</span>);
        })
    }
    render() {
        return(
            <div className="container">
            <button style={{backgroundColor:"green",color:"white"}} onClick={() => {this.props.history.push('/');return null;}}>Back</button>
            <main className="cards">
                {this.renderList()}
            </main>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedData: state.selectedData
    };
}
export default connect(mapStateToProps,{emptySelectedData})(Compare);