import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function AddPost() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Must enter a title")
            .min(2, 'name must be more than two characters'),
        content: yup.string().required("Must enter content for your post"),
        image_url: yup.string().required("Must add an image link"),
      })

    const formik = useFormik({
        initialValues: {
          title:'',
          content:'',
          image_url:'',
          date_added: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/posts/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(post => {
                // onAddPost(post)
                navigate(`/`)
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <>
        {error ? <h2 style={{color:'red', textAlign:'center'}}> {error} </h2> : <></>}
        <div className="ui container">
            <form style={{width:"60%", margin:"auto", padding:"25px"}} className="ui form" onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label>Add Post</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Post title..." onChange={formik.handleChange}></input>
                </div>
                <div className="field">
                    <input type="text" name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                </div>    
                <div className="field">
                    <textarea type="text" name="content" value={formik.values.content} placeholder="Post content..." onChange={formik.handleChange}></textarea>               
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

export default AddPost




// const initialState = {
    //     title: "",
    //     content: "",
    //     image_url: "",
    //     date_added: new Date().toLocaleDateString('en-US'),
    // }
    
    // const [formData, setFormData] = useState(initialState)

    // function handleChange(e) {
    //     //console.log(e.target.value)
    //     setFormData({...formData, [e.target.name]: e.target.value})
    // }

    // function handleAddNewPost(e){
    //     e.preventDefault()
    //     if(window.confirm("Are you sure you're ready to post?")) {
    //     setFormData({...formData, date: new Date().toLocaleDateString('en-US')})
    //     fetch("/posts/new", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({...formData})
    //     })
    //         .then((res) => res.json())
    //         .then((newPost) => {
    //             // onAddPost(newPost)
    //             navigate('/')
    //         })
    //     setFormData(initialState)
    //     }
    // }