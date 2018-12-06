import React from "react";
import { shallow, mount, render } from "enzyme";

import Square from "./square";
import Line from "./line";
import TableBoard from "./index";

describe("Square renders", () => {
    it("Square without children", () => {
        const wrapper = shallow(<Square />);

        expect(wrapper).toMatchSnapshot();
    });

    it("Square with children", () => {
        const wrapper = shallow(<Square>
            <div>
                any component should we able to render
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

describe("tableboard renders", () => {
    it("tableboad with prop size", () => {
        const wrapper = shallow(<TableBoard size={{ x: 5, y: 5 }} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("tableboad mouting", () => {
        const wrapper = mount(<TableBoard size={{ x: 5, y: 5 }} />);

        expect(wrapper).toMatchSnapshot();
    });
});