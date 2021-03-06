import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";

/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [town, setTown] = useState(
    initialData ? initialData.town : ""
  );
  const [district, setDistrict] = useState(
    initialData ? initialData.district : ""
  );
  const [city, setCity] = useState(
    initialData ? initialData.city : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        town,
        district,
        city,
        address,
        addressType,
      },
    };
    console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          town,
          district,
          city,
          address,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="H??? & T??n "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="S??? ??i???n Tho???i"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Ph?????ng / X?? / Th??? Tr???n"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Qu???n / Huy???n"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>

        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="T???nh / Th??nh Ph???"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="?????a Ch??? "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <br/>
        <div>
          <div style={{color : 'blue', margin : '10px 0 10px 5px' }}>N??i giao h??ng?</div>
          <div className="flexRow">
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span>Nh?? Ri??ng</span>
            </div>
            <div style={{marginLeft : '25px' }}>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span>C?? Quan</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title="L??u L???i v?? Giao H??ng"
            onClick={onAddressSubmit}
            style={{
              width: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </>
    );
  };

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"Th??m ?????a Ch??? Giao H??ng.."}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;