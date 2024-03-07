import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function AddPainting() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title"),
        materials: yup.string().required("Must enter materials used"),
        width: yup.number().integer().required("Must enter a width"),
        height: yup.number().integer().required("Must enter a height"),
        price: yup.string().required("Must enter an price"),
        fullsize: yup.string().required("Must enter a fullzise image link"),
        image: yup.string().required("Must enter an image link"),
        sold: yup.string().required("Must enter True or False"),
    })
    const formik = useFormik({
        initialValues: {
            title:'',
            materials:'',
            width:'',
            height:'',
            price:'',
            fullsize:'',
            image:'',
            sold:'',
        },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/paintings/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if(res.ok) {
          res.json().then(painting => {
            // onAddPainting(painting)
            navigate(`/paintings`)
          })
        } else {
            res.json().then(error => setError(error.message))
        }
      })
    },
  })

    return (
        <>
        {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
        <div className="ui container">
            <form style={{width:"60%", margin:"auto", padding:"25px"}} className="ui form" onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label>Add Painting</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Title..." onChange={formik.handleChange}></input>
                </div>
                <div className="field">
                    <input type="text"name="materials" value={formik.values.materials} placeholder="Materials..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <input type="text"  name="width" value={formik.values.width} placeholder="Width in inches..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <input type="text" name="height" value={formik.values.height} placeholder="Height in inches..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <input type="text" name="price" value={formik.values.price} placeholder="Price..." onChange={formik.handleChange}></input>               
                </div>  
                <div className="field">
                    <input type="text"  name="fullsize" value={formik.values.fullsize} placeholder="Fullsize image link..." onChange={formik.handleChange}></input>               
                </div>
                <div className="field">
                    <input type="text" name="image" value={formik.values.image} placeholder="Small image link..." onChange={formik.handleChange}></input>               
                </div>           
                <div className="field">
                    <label for="sold">Is the painting already sold?</label>
                    <input type="text" name="sold" value={formik.values.sold} placeholder="True or False..." onChange={formik.handleChange}></input>               
                </div>
                <div className="field">
                <Link to="/" className="ui button small teal" >Back</Link>
                <button style={{float: "right"}} className="ui button small teal" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default AddPainting
