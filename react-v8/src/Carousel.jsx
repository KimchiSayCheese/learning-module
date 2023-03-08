import { useState } from "react";
import { Component } from "react";

export class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
const imagesPlaceholder = ["http://pets-images.dev-apis.com/pets/none.jpg"];
export const Carousel2 = ({ images = imagesPlaceholder }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="carousel">
      <img src={images[active]} alt="animal hero" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            src={photo}
            data-index={index}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={(e) => {
              return setActive(+e.target.dataset.index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
