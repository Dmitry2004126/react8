import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState('us');
    const genders = [
        { name: 'United States', code: 'us' },
        { name: 'United Kingdom', code: 'gb' },
        { name: 'Japan', code: 'jp' },
        { name: 'Italy', code: 'it' },
        { name: 'Iran', code: 'ir' }
    ];
    const [width, setWidth] = useState(32);
    
    
    const changeWidth = (event) => {
    setWidth(event.target.value);
    };
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };
    const handleClearFilters = () => {
        setSelectedCategory('');
        setSearchQuery('');
        setSelectedGender('us');
        setWidth(32);
    };
   
    
    return (
        <>
            <Navbar fixed="top"  bg="primary" data-bs-theme="dark" > 
                <Container className='d-block w-50'>
                    <h1 className='text-center' style={{ color: '#f8f9fa' }}>NEWS</h1>
                        <Nav className='d-flex justify-content-between'>
                            {['Business', 'Politics', 'Health', 'Science', 'Sports', 'Tech'].map((category) => (
                                <Button
                                    key={category}
                                    variant="btn btn-outline-light"
                                    onClick={() => handleCategoryClick(category.toLowerCase())}
                                >{category}
                                </Button>
                            ))}
                                <Button variant="btn btn-outline-light" onClick={handleClearFilters}>Clear Filters</Button>
                        </Nav>
                        <Form className="mt-3">
                            <Row className="align-items-center">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search news"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="mb-3"
                                    />
                                </Col>
                                <Col>
                                    <Form.Select value={selectedGender} onChange={handleGenderChange} className="mb-3">
                                        {genders.map((gender) => (
                                            <option key={gender} value={gender.code}>
                                                {gender.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                        <h4 className='text-center' style={{ color: '#f8f9fa'}}>Number of news: {width} items <input  type='range'
                            onChange={changeWidth}
                            min={1}
                            max={32}
                            step={1}
                            value={width}
                        ></input></h4>
                </Container>
            </Navbar>
            <div className="articles">
               
                <NewsList selectedCategory={selectedCategory} searchQuery={searchQuery} selectedGender={selectedGender} width={width} />
                
            </div>
            
        </>
    );
}
function NewsList({ selectedCategory, searchQuery, selectedGender, width }) {
    const BASE_URL = "https://newsapi.org/v2/top-headlines?apiKey=be1b1c5968dc45888ed4acb323aad105";
   
    
    const [articles, setArticles] = useState([]);
    


    useEffect(() => {
        const fetchData = async () => {
            let url2 = `${BASE_URL}&country=`;
            if (selectedGender) {
                url2+= `${selectedGender}`;
            }
            if (selectedCategory) {
                url2 += `&category=${selectedCategory}`;
            }
            if (searchQuery) {
                url2 += `&q=${searchQuery}`;
            }
            if (width){
                url2 += `&pageSize=${width}`;
            }
            
            
            const response =  await fetch(url2);
            const jsonData =  await response.json();
            setArticles(jsonData.articles || []);  
        };
        fetchData();
    }, [selectedCategory, searchQuery, selectedGender, width]);
    
  

    return (
        <Container className="mt-5 ">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" >
        
                {articles.map((item) => (
        
                    <Col key={item.title} className='mb-3'>
                        
                        <Card style={{ width: '18rem', height: '400px' }}>
                          <Card.Img variant="top" src={item.urlToImage}/>
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                               Source: {item.source.name}
                               </Card.Text>
                               <Card.Text> 
                               Author: {item.author}
                            </Card.Text>
                          </Card.Body>
                          <Card.Body>
                            <Card.Text>
                              {item.description}
                            </Card.Text>

                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>Published at: {item.publishedAt.split("T")[0]}</ListGroup.Item>
                          </ListGroup>
                        </Card>
                    </Col>
                ))}
            </div>
        </Container>
    );
}

export default App;