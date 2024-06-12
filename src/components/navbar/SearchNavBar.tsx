import { useState } from "react";
import "./SearchNavBar.scss";
import SearchInput from "../../components/common/SearchInput";
import SearchButton from "./SearchButton";
import ExerciseModal from "../../components/mentor/step1/ExerciseModal";
import RegionModal from "../../components/mentor/step2/RegionModal";
import SelectGender from "../../components/modal/SelectGender";
import SelectPrice from "../../components/modal/SelectPrice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function SearchNavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleExerciseButtonClick = () => {
    setIsExerciseModalOpen(true);
  };

  const handleExerciseCloseModal = () => {
    setIsExerciseModalOpen(false);
  };

  const handleExerciseSelect = (exercise: string) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.includes(exercise)
        ? prevSelected.filter((e) => e !== exercise)
        : [...prevSelected, exercise]
    );
  };

  const handleExerciseCompleteSelection = () => {
    setIsExerciseModalOpen(false);
  };

  const handleExerciseResetSelection = () => {
    setSelectedExercises([]);
  };

  const handleRegionButtonClick = () => {
    setIsRegionModalOpen(true);
  };

  const handleRegionCloseModal = () => {
    setIsRegionModalOpen(false);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegions((prevSelected) =>
      prevSelected.includes(region)
        ? prevSelected.filter((r) => r !== region)
        : [...prevSelected, region]
    );
  };

  const handleRegionCompleteSelection = () => {
    setIsRegionModalOpen(false);
  };

  const handleRegionResetSelection = () => {
    setSelectedRegions([]);
  };

  const handleGenderButtonClick = () => {
    setIsGenderModalOpen(true);
  };

  const handleGenderCloseModal = () => {
    setIsGenderModalOpen(false);
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setIsGenderModalOpen(false);
  };

  const handlePriceButtonClick = () => {
    setIsPriceModalOpen(true);
  };

  const handlePriceCloseModal = () => {
    setIsPriceModalOpen(false);
  };

  const handleRateSelect = (rate: string) => {
    setSelectedRate(rate);
    setIsPriceModalOpen(false);
  };

  return (
    <Navbar className="search-navbar">
      <Container>
        <Navbar.Toggle aria-controls="search-navbar-nav" />
        <Navbar.Collapse id="search-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className="nav-item">
              <SearchInput placeholder="키워드 입력" onSearch={handleSearch} />
            </Nav.Item>
            <Nav.Item className="nav-item">
              <SearchButton
                value="운동종목"
                onClick={handleExerciseButtonClick}
              />
            </Nav.Item>
            <Nav.Item className="nav-item">
              <SearchButton value="지역" onClick={handleRegionButtonClick} />
            </Nav.Item>
            <Nav.Item className="nav-item">
              <SearchButton value="수업료" onClick={handlePriceButtonClick} />
            </Nav.Item>
            <Nav.Item className="nav-item">
              <SearchButton value="성별" onClick={handleGenderButtonClick} />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <ExerciseModal
        show={isExerciseModalOpen}
        handleClose={handleExerciseCloseModal}
        selectedExercises={selectedExercises}
        handleExerciseSelect={handleExerciseSelect}
        handleCompleteSelection={handleExerciseCompleteSelection}
        handleResetSelection={handleExerciseResetSelection}
      />

      <RegionModal
        show={isRegionModalOpen}
        handleClose={handleRegionCloseModal}
        selectedRegions={selectedRegions}
        handleRegionSelect={handleRegionSelect}
        handleCompleteSelection={handleRegionCompleteSelection}
        handleResetSelection={handleRegionResetSelection}
      />

      <SelectGender
        show={isGenderModalOpen}
        handleClose={handleGenderCloseModal}
        selectedGender={selectedGender}
        handleGenderSelect={handleGenderSelect}
      />

      <SelectPrice
        show={isPriceModalOpen}
        handleClose={handlePriceCloseModal}
        selectedRate={selectedRate}
        handleRateSelect={handleRateSelect}
      />
    </Navbar>
  );
}

export default SearchNavBar;
