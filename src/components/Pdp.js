import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emptyPdpData } from '../actions';
import _ from 'lodash';
import ImageCard from './ImageCard';
import './main.css'

class Pdp extends React.Component {
    constructor(props) { super(props); this.createBenefitsCards.bind(this); this.createRows.bind(this); }
    componentWillUnmount() {
        this.props.emptyPdpData();
    }

    createBenefitsCards() {
        return (
            <article className="col-md-8" key="index" >
                <div className="text">
                    <div className="card" style={{ display: "inline-block" }}>{this.createMedicalBenefits()}</div>
                    <div className="card" style={{ display: "inline-block" }}>{this.createTravelBenefits()}</div>
                </div>
            </article>
        );
    }

    createTravelBenefits() {
        const { pdpData } = this.props;
        const travelData = _.get(pdpData, "plan.planBenefitCategories.TravelFeatures", []);
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ fontSize: "26px", color: "red" }}>Travel Features</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createRows(travelData)}
                </tbody>
            </table>
        );
    }

    createMedicalBenefits() {
        const { pdpData } = this.props;
        const medicalFeatures = _.get(pdpData, "plan.planBenefitCategories.MedicalFeatures", []);
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th style={{ fontSize: "26px", color: "red" }}>Medical Features</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createRows(medicalFeatures)}
                </tbody>
            </table>
        );
    }

    createRows(data) {
        return data.map((item, index) => {
            return (<tr key={index}><th>{item.benefitName}</th></tr>);
        })
    }
    render() {
        const { pdpData } = this.props;
        return (<div className="container-full">
            <button style={{backgroundColor:"green",color:"white"}} onClick={() => {this.props.history.push('/');return null;}}>Back </button>
            <main className="cards">
                <article className="card">
                    <ImageCard imageData={pdpData} />
                    <div className="text">
                        <p><b>Plan :</b> {_.get(pdpData, 'plan.planName', 'N/A')}</p>
                        <p><b>Insurance Provider Name:</b> {_.get(pdpData, 'plan.insuranceProviderName', 'N/A')}</p>
                        <p><b>Sum Insured :</b> {_.get(pdpData, 'sumInsured', 'N/A')}</p>
                        <p><b>Premium :</b> {_.get(pdpData, 'totalAmount.amount', 'N/A')}</p>
                    </div>
                </article>
                {this.createBenefitsCards()}
            </main>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        pdpData: state.pdpData.data
    }
};
export default connect(mapStateToProps, {
    emptyPdpData
})(Pdp);