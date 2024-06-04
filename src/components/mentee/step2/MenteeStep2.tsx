import React, { useState, useEffect } from "react";
import { MenteeData } from "../../../pages/mentee/MenteePage";
import ModalInputDisplay from "../../modal/ModalInputDisplay";
import RegionModal from "./RegionModal";
import "./MenteeStep2.scss";
import "../common.scss";

interface MenteeStep2Props {
  onNext: (data: Partial<MenteeData>) => void;
  onPrev: (data: Partial<MenteeData>) => void;
  data: MenteeData;
}

const MenteeStep2: React.FC<MenteeStep2Props> = ({ onNext, onPrev, data }) => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    data.regions
  );
  const [showModal, setShowModal] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    // 기존에 선택된 지역을 설정
    setSelectedRegions(data.regions);
  }, [data.regions]);

  const handleNext = () => {
    if (selectedRegions.length === 0) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000); // 1초 후에 다시 원상태로
    } else {
      onNext({ regions: selectedRegions });
    }
  };

  const handlePrev = () => {
    onPrev({ regions: selectedRegions });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleRegionSelect = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handleCompleteSelection = () => {
    setShowModal(false);
  };

  const handleResetSelection = () => {
    setSelectedRegions([]);
  };
  const isAnyRegionsSelected = selectedRegions.length > 0;
  return (
    <div className="mentor-step-page container text-center p-0">
      <div className="mx-auto text-start">
        <div className="input-title">가능한 지역을 선택해주세요.</div>
        <div className="input-subtitle">가능한 지역을 모두 선택해주세요.</div>
        <ModalInputDisplay
          displayText={selectedRegions.join(", ")}
          onClick={handleShowModal}
          placeholder="지역 선택"
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button
            className={`btn w-50 ms-2 ${
              isInvalid
                ? "btn-invalid"
                : isAnyRegionsSelected
                ? "btn-primary active"
                : "btn-primary"
            }`}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
      <RegionModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedRegions={selectedRegions}
        handleRegionSelect={handleRegionSelect}
        handleCompleteSelection={handleCompleteSelection}
        handleResetSelection={handleResetSelection}
      />
    </div>
  );
};

export default MenteeStep2;
