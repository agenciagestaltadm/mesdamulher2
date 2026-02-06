import { render } from "@testing-library/react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

const tabs = [
  { id: "1", label: "02 mar · 13h", content: <div>Curso 1</div> },
  { id: "2", label: "02 mar · 18h", content: <div>Curso 2</div> },
  { id: "3", label: "03 mar · 13h", content: <div>Curso 3</div> },
  { id: "4", label: "03 mar · 18h", content: <div>Curso 4</div> },
];

describe("AnimatedTabs visual", () => {
  it("renderiza estável no desktop", () => {
    const { container } = render(
      <div style={{ width: 1024 }}>
        <AnimatedTabs tabs={tabs} />
      </div>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renderiza estável no mobile", () => {
    const { container } = render(
      <div style={{ width: 360 }}>
        <AnimatedTabs tabs={tabs} />
      </div>,
    );
    expect(container).toMatchSnapshot();
  });
});
