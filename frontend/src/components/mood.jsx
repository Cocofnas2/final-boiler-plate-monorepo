import React, { useEffect, useState } from 'react';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import styled from 'styled-components';
import { useRestaurantStore } from '../stores/restaurantStore'; // Ensure the path is correct
import { Link } from 'react-router-dom'; 


// Styled components, change to fit our stylingschema
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #FFF0F3; // Your chosen color
  min-height: 100vh; // Full height of the viewport
`;
const TitleContainer = styled.div`
  text-align: center; /* Centers the title text */
  margin-bottom: 20px; /* Adds some space between the title and the buttons */
  color: #800F2F;
  font-family: Montserrat, sans-serif;
`;
const MoodSelectorContainer = styled.div`
display: flex; /* Enables Flexbox */
flex-wrap: wrap; /* Allows items to wrap to the next line */
justify-content: space-around; /* Distributes space around items */
align-items: flex-start; /* Aligns items to the start */
gap: 10px; /* Adds a gap between buttons */
width: 100%; /* Ensures the container takes full width */
max-width: 1200px; /* Sets a max-width for the container */
margin: 0 auto; /* Centers the container in the parent */
`;

const MoodButton = styled.button`
background-color: #FFCCD5;
  color: #800F2F;
  padding: 10px 20px; /* Some padding */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  text-align: center; /* Center the text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block element */
  font-size: 16px; /* Font size */
  margin: 4px 2px; /* Margin around the button */
  transition-duration: 0.4s; /* Transition for hover effect */
  background-color: ${props => props.selected ? '#FF8FA3' : '#FFCCD5'};

  &:hover {
    background-color: #FF8FA3;
    color: #590D22;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ResultsButton = styled.button`
background-color: #FFCCD5;
  color: #800F2F;
  padding: 10px 20px; /* Some padding */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  text-align: center; /* Center the text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block element */
  font-size: 16px; /* Font size */
  margin: 4px 2px; /* Margin around the button */
  transition-duration: 0.4s; /* Transition for hover effect */
  background-color: ${props => props.$clicked ? '#SomeColorForClickedState' : '#FFCCD5'};

  &:hover {
    background-color: #FF8FA3;
    color: #590D22;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MoodSelector = () => {
  const { moods, selectedMoods, fetchMoods, setSelectedMoods, fetchResults } = useRestaurantStore();
  const [resultsButtonClicked, setResultsButtonClicked] = useState(false);

  useEffect(() => {
    setSelectedMoods([]);
    fetchMoods();
  }, [fetchMoods, setSelectedMoods]);

  const handleMoodClick = (mood) => {
    setSelectedMoods(prevSelectedMoods => {
      // Check if the mood is already selected
      if (prevSelectedMoods.includes(mood)) {
        // If so, remove it from the array
        return prevSelectedMoods.filter(selectedMood => selectedMood !== mood);
      } else {
        // If the mood is not selected and we have less than 3 moods selected,
        // add this mood to the array
        if (prevSelectedMoods.length < 3) {
          return [...prevSelectedMoods, mood];
        }
        // If already 3 moods are selected, return the array as is
        console.log('You can select up to 3 moods.');
        return prevSelectedMoods;
      }
    });
  };
  
  

  const handleResultsButtonClick = async () => {
    if (selectedMoods.length > 0 && selectedMoods.length <= 3) {
      setResultsButtonClicked(true); // Set the state to true when the button is clicked
      await fetchResults(selectedMoods);
    } else {
      console.log('Please select between 1 and 3 moods.');
    }
  };


  return (
    <PageContainer>
      <Navbar />
      <TitleContainer>
        <h2>Select your mood(s)</h2>
        <p>You can select a minimum of one mood and a maximum of three moods</p>
      </TitleContainer>
      <MoodSelectorContainer>
        {moods.map((mood) => (
          <MoodButton
            key={mood}
            onClick={() => handleMoodClick(mood)}
            selected={selectedMoods.includes(mood)}
          >
            {mood}
          </MoodButton>
        ))}
      </MoodSelectorContainer>
      <Link to="/occasion">
        <MoodButton onClick={handleResultsButtonClick}>
          Back to occasion
        </MoodButton>
      </Link>
      <Link to="/result">
  <ResultsButton 
    onClick={handleResultsButtonClick} 
    $clicked={resultsButtonClicked}
  >
    Give me my results
  </ResultsButton>
</Link>


      <Footer />
    </PageContainer>
  );
};

export default MoodSelector;
