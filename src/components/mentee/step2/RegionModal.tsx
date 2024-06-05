import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResetButton from "../../common/ResetButton";
import SearchInput from "../../common/SearchInput";
import "./RegionModal.scss";

interface RegionModalProps {
  show: boolean;
  handleClose: () => void;
  selectedRegions: string[];
  handleRegionSelect: (region: string) => void;
  handleCompleteSelection: () => void;
  handleResetSelection: () => void;
}

const regions = ["서울", "경기", "인천", "부산", "대구"];
const regionsByArea: { [key: string]: string[] } = {
  서울: [
    "서울전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "송파구",
  ],
  경기: ["경기전체", "수원시", "성남시", "안양시", "평택시", "의정부시"],
  인천: ["인천전체", "남구", "남동구", "동구", "미추홀구", "연수구"],
  부산: ["부산전체", "중구", "서구", "동구", "영도구", "부산진구"],
  대구: ["대구전체", "중구", "동구", "서구", "남구", "북구"],
};

const RegionModal: React.FC<RegionModalProps> = ({
  show,
  handleClose,
  selectedRegions,
  handleRegionSelect,
  handleCompleteSelection,
  handleResetSelection,
}) => {
  const [selectedArea, setSelectedArea] = useState(regions[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredRegions = regionsByArea[selectedArea].filter((region) =>
    region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (region: string) => selectedRegions.includes(region);

  return (
    <Modal show={show} onHide={handleClose} className="region-modal">
      <Modal.Header className="modal-header">
        <Modal.Title>지역선택</Modal.Title>
        <button
          type="button"
          className="custom-close-button"
          onClick={handleClose}
        >
          <img src="./buttons/icon-x-circle.png" alt="x" />
        </button>
        <SearchInput
          placeholder="지역 검색 (예시: 강남구, 성북구)"
          onSearch={handleSearch}
        />
      </Modal.Header>
      <Modal.Body className="d-flex">
        <div className="sidebar">
          {regions.map((area) => (
            <div
              key={area}
              className={`sidebar-item ${
                area === selectedArea ? "selected" : ""
              }`}
              onClick={() => setSelectedArea(area)}
            >
              {area}
            </div>
          ))}
        </div>
        <div className="content">
          <div className="region-list">
            {filteredRegions.map((region) => (
              <div
                key={region}
                className={`region-item ${
                  isSelected(region) ? "selected" : ""
                }`}
                onClick={() => handleRegionSelect(region)}
              >
                {region}
                {isSelected(region) && <span className="check-mark">✔</span>}
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <ResetButton onClick={handleResetSelection} />
        <Button
          variant="primary"
          onClick={handleCompleteSelection}
          className={`custom-complete-button ${
            selectedRegions.length > 0 ? "active" : ""
          }`}
        >
          선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegionModal;
