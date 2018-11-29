import React from "react";
import { shallow, mount, render } from "enzyme";

import Square from "./square";
import Line from "./line";

describe("Square renders", () => {
    it("Square without children", () => {
        const wrapper = shallow(<Square />);

        expect(wrapper).toMatchSnapshot();
    });

    it("Square with children", () => {
        const wrapper = shallow(<Square>
            <div>
                hello test
            </div>
        </Square>);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("Line renders", () => {
    it("Simple line", () => {
        const wrapper = shallow(<Line />);

        expect(wrapper).toMatchSnapshot();
    });
});