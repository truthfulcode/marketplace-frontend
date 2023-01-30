import React from 'react'
import {Box, TextareaAutosize, TextField} from "@mui/material";
import Navbar from '../components/Navbar';
import {styles, SubmitButton, TitleText} from '../components/StyledComponents'
import Footer from '../components/Footer';

const faq = () => {
  return (
    <Box sx={{ ...styles.header, ...styles.header, ...styles.shadow, height:"100vh"}}> {/* Main Wrapper */}
      <Navbar/>
      <Box sx={{ ...styles.center, ...styles.header, height:"auto", width:"100%", justifyContent:"space-between", paddingLeft:"75px", paddingRight:"75px"}}> {/* Splitter Div */}
        <table className="listTable" style={{minWidth:"20vw", width:"30vw"}}> {/* Questions Table */}
          <tbody>
            <tr>
              <th style={{textAlign:"center", width:"100%"}} colSpan={2}>Frequently Asked Questions (FAQ)</th>
            </tr>
            <tr>
              <td className="questionsLeft">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, vitae! Neque magni quam assumenda repudiandae reprehenderit ducimus ut hic tempore?</td>
              <td className="questionsRight"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="grey" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg></td>
            </tr>
            <tr>
              <td className="questionsLeft">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum, adipisci at nisi est quam odio?</td>
              <td className="questionsRight"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="grey" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg></td>
            </tr>
            <tr>
              <td className="questionsLeft">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa alias quo architecto?</td>
              <td className="questionsRight"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="grey" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg></td>
            </tr>
          </tbody>
        </table>
        <Box sx={{ ...styles.center, ...styles.header, minHeight:"60vh", width:"60vw", flexDirection:"column", justifyContent:"flex-start"}}> {/* Right Side */}
          <TitleText style={{display: "flex", justifyContent:"center", width:"100%", marginTop:"100px", marginBottom:"50px"}}>Question 1</TitleText>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis beatae laborum, cum distinctio adipisci quaerat iste quae. Architecto itaque sapiente est debitis. Quibusdam inventore quaerat error at repellendus sequi culpa aspernatur mollitia, quos, non tempora tempore? Nostrum, provident vitae porro aperiam vel fugiat quos totam accusantium perspiciatis perferendis natus obcaecati tenetur ex cupiditate eveniet. Doloremque tempore repudiandae quam quidem. Quibusdam commodi ab tempora corrupti fugiat. Et, ullam. Dolore architecto eligendi, maxime voluptatibus minus, laborum error sint labore nulla deserunt hic excepturi rem molestiae eveniet animi praesentium exercitationem sit culpa sapiente fuga! Magni quisquam quam assumenda recusandae exercitationem nisi facilis odio.</p>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default faq;