import React from "react";
import { Form, FormGroup, FormText, Input, Button } from "reactstrap";
import axios from "axios";
import NavbarComponent from "../NavbarComponent";

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      previewImage: "",
      message: ""
    };
  }

  handleSubmitFile = e => {
    // Prevent the default behaviour of the form submitting
    e.preventDefault();
    // Authorization of the user
    let JWT = sessionStorage.getItem("userToken");
    // Formdata object to hold the image file to send to the server
    let formData = new FormData();
    // Append the key:value pair to the formData object
    formData.append("image", this.state.imageFile);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${JWT}` }
      })
      .then(response => {
        if (response.data.success) {
          this.setState({
            message: "Image Uploaded Successfully!",
            previewImage: null,
            imageFile: null
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleFile = e => {
    this.setState({
      previewImage: URL.createObjectURL(e.target.files[0]),
      imageFile: e.target.files[0]
    });
  };

  render() {
    const { previewImage, message } = this.state;
    return (
      <>
      <NavbarComponent></NavbarComponent>
        <div
          style={{
            margin: "auto",
            width: "70vh",
            height: "70vh",
            border: "1px dotted",
            borderColor: "orange"
          }}
          className="card mt-3"
        >
          {previewImage ? (
            <img
              style={{ margin: "auto", width: "50vh", height: "50vh" }}
              src={previewImage}
            />
          ) : (
            <h3 className="text-center">
              {message ? message : "Live Preview"}
            </h3>
          )}
        </div>
        <div className=" d-flex justify-content-center mt-3">
          <Form onSubmit={this.handleSubmitFile}>
            <FormGroup>
              <Input
                type="file"
                name="image-file"
                onChange={this.handleFile}
              ></Input>
              <FormText color="muted"></FormText>
            </FormGroup>
            <Button type="submit" color="primary">
              Upload
            </Button>
          </Form>
        </div>
      </>
      // Your code will go here
    );
  }
}

export default UploadPage;
