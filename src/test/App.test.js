import React from "react";
import expect from "expect";
import App from "../App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";

configure({ adapter: new Adapter() });

describe("Hacker Shop <App/>", () => {
  // it('complete app renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<App />, div);
  // });

  it("Empty Cart", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("tbody").text()).toEqual(
      "Coupon CodeNONESub Total$ 0Shipping$ 0Tax(5%)$ 0Total Price$ 0"
          );
  });

  it("Delete Item not present in cart Nothing should happen", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#buttonAdd0").simulate("click");
    wrapper.find("button#buttonDelete1").simulate("click");
    expect(wrapper.find("tbody").text()).toEqual(
      "Cap1$ 5Coupon CodeNONESub Total$ 5Shipping$ 3Tax(5%)$ 0.25Total Price$ 8.25"
          );
  });

  it("Check Shipping cost (free shipping if Subtotal > $50)", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#buttonAdd3").simulate("click");
    wrapper.find("button#buttonAdd1").simulate("click");
    expect(wrapper.find("tr#shippingRow").text()).toEqual(
      "Shipping$ 0"
          );
    expect(wrapper.find("tr#taxRow").text()).toEqual(
      "Tax(5%)$ 4"
          );
  });
  
  it("Check Tax is present in the cart", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#buttonAdd3").simulate("click");
    wrapper.find("button#buttonAdd1").simulate("click");
    expect(wrapper.find("tr#taxRow").text()).toEqual(
      "Tax(5%)$ 4"
          );
  })

  it("Add item multiple times and deleting the item", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#buttonAdd3").simulate("click");
    wrapper.find("button#buttonAdd3").simulate("click");
    wrapper.find("button#buttonAdd3").simulate("click");
    expect(wrapper.find("tr#itemRow0").text()).toEqual(
      "Shoe3$ 150"
          );
    wrapper.find("button#buttonDelete3").simulate("click");
    expect(wrapper.find("tr#itemRow0").text()).toEqual(
      "Shoe2$ 100"
          );
    wrapper.find("button#buttonDelete3").simulate("click");
    expect(wrapper.find("tr#itemRow0").text()).toEqual(
      "Shoe1$ 50"
          );
      
  });

  it("Check total price", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#buttonAdd1").simulate("click");
    wrapper.find("button#buttonAdd2").simulate("click");
    wrapper.find("button#buttonAdd3").simulate("click");
    expect(wrapper.find("tr#totalPriceRow").text()).toEqual(
      "Total Price$ 120.75"
          );
  });

});
