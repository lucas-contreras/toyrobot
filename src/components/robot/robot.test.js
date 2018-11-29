import React from "react";
import { shallow } from "enzyme";

import RoboImg from "./robotImg";
import Robot from "./index";

describe("RobotImg component", () => {
    it("Robo img facing 270", () => {
        const wrapper = shallow(<RoboImg facing={270} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("Robo img facing 180", () => {
        const wrapper = shallow(<RoboImg facing={180} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("Robo img facing 90", () => {
        const wrapper = shallow(<RoboImg facing={90} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("Robo img facing 0", () => {
        const wrapper = shallow(<RoboImg facing={0} />);

        expect(wrapper).toMatchSnapshot();
    });

    it("Robo", () => {
        const robot = { facing: 90 }
        const wrapper = shallow(<Robot robot={robot} />);

        expect(wrapper).toMatchSnapshot();
    });
});