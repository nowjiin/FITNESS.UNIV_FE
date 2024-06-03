import React, { useState } from "react";
import { MentorData } from "../../../pages/mentor/MentorPage";
import ModalInputDisplay from "../../modal/ModalInputDisplay";
import ModalByCase from "./ModalByCase";
import "../common.scss";

const universitiesByCategory: { [key: string]: string[] } = {
  전체: [
    "가야대학교",
    "가천대학교",
    "가톨릭대학교",
    "건국대학교",
    "경기대학교",
    "경남과학기술대학교",
    "경남대학교",
    "경북대학교",
    "경상국립대학교",
    "경성대학교",
    "경운대학교",
    "경일대학교",
    "경주대학교",
    "경희대학교",
    "계명대학교",
    "고려대학교",
    "공주교육대학교",
    "공주대학교",
    "광신대학교",
    "광운대학교",
    "광주가톨릭대학교",
    "광주대학교",
    "광주여자대학교",
    "국민대학교",
    "군산대학교",
    "극동대학교",
    "금강대학교",
    "금오공과대학교",
    "김천대학교",
    "꽃동네대학교",
    "나사렛대학교",
    "남부대학교",
    "남서울대학교",
    "단국대학교",
    "대구가톨릭대학교",
    "대구대학교",
    "대구한의대학교",
    "대신대학교",
    "대전가톨릭대학교",
    "대전대학교",
    "대진대학교",
    "동국대학교",
    "동덕여자대학교",
    "동명대학교",
    "동서대학교",
    "동신대학교",
    "동아대학교",
    "동양대학교",
    "동의대학교",
    "루터대학교",
    "명지대학교",
    "목포가톨릭대학교",
    "목포대학교",
    "목포해양대학교",
    "배재대학교",
    "백석대학교",
    "부경대학교",
    "부산가톨릭대학교",
    "부산대학교",
    "부산외국어대학교",
    "부산장신대학교",
    "삼육대학교",
    "상명대학교",
    "서강대학교",
    "서경대학교",
    "서울과학기술대학교",
    "서울대학교",
    "서울시립대학교",
    "서울신학대학교",
    "서울여자대학교",
    "서울장신대학교",
    "서울한영대학교",
    "서원대학교",
    "선문대학교",
    "성공회대학교",
    "성균관대학교",
    "성신여자대학교",
    "세명대학교",
    "세종대학교",
    "송원대학교",
    "수원가톨릭대학교",
    "수원대학교",
    "숙명여자대학교",
    "순천대학교",
    "순천향대학교",
    "숭실대학교",
    "숭의여자대학교",
    "신경대학교",
    "신라대학교",
    "아세아연합신학대학교",
    "아주대학교",
    "안동대학교",
    "안양대학교",
    "연세대학교",
    "영남대학교",
    "영산대학교",
    "영진전문대학교",
    "예수대학교",
    "예원예술대학교",
    "용인대학교",
    "우석대학교",
    "울산과학기술원",
    "울산대학교",
    "원광대학교",
    "위덕대학교",
    "이화여자대학교",
    "인제대학교",
    "인천가톨릭대학교",
    "인천대학교",
    "인하대학교",
    "전남대학교",
    "전북대학교",
    "전주대학교",
    "제주대학교",
    "조선대학교",
    "중부대학교",
    "중앙대학교",
    "차의과학대학교",
    "창신대학교",
    "청운대학교",
    "청주대학교",
    "총신대학교",
    "충남대학교",
    "충북대학교",
    "침례신학대학교",
    "탐라대학교",
    "평택대학교",
    "포항공과대학교",
    "한국가톨릭대학교",
    "한국교원대학교",
    "한국기술교육대학교",
    "한국방송통신대학교",
    "한국성서대학교",
    "한국외국어대학교",
    "한국체육대학교",
    "한국해양대학교",
    "한남대학교",
    "한동대학교",
    "한림대학교",
    "한밭대학교",
    "한서대학교",
    "한성대학교",
    "한세대학교",
    "한양대학교",
    "한영대학교",
    "협성대학교",
    "호남대학교",
    "호서대학교",
    "홍익대학교",
  ],
  서울: [
    "가톨릭대학교",
    "고려대학교",
    "광운대학교",
    "국민대학교",
    "덕성여자대학교",
    "동국대학교",
    "동덕여자대학교",
    "명지대학교",
    "서강대학교",
    "서울과학기술대학교",
    "서울대학교",
    "서울시립대학교",
    "서울여자대학교",
    "성공회대학교",
    "성균관대학교",
    "세종대학교",
    "숙명여자대학교",
    "숭실대학교",
    "연세대학교",
    "이화여자대학교",
    "중앙대학교",
    "한국외국어대학교",
    "한국체육대학교",
    "한성대학교",
    "한양대학교",
    "홍익대학교",
  ],
  경기: [
    "가천대학교",
    "가톨릭대학교",
    "경기대학교",
    "경기과학기술대학교",
    "경민대학교",
    "경복대학교",
    "경인교육대학교",
    "경희대학교",
    "단국대학교",
    "동국대학교",
    "수원대학교",
    "성균관대학교",
    "아주대학교",
    "연세대학교",
    "용인예술과학대학교",
    "오산대학교",
    "여주대학교",
    "연성대학교",
    "중앙대학교",
    "한국외국어대학교",
    "한양대학교 ERICA 캠퍼스",
  ],
  인천: [
    "가천대학교",
    "인천대학교",
    "인천가톨릭대학교",
    "인천과학기술대학교",
    "인천신학대학교",
    "인천재능대학교",
    "인천카톨릭대학교",
    "인하대학교",
  ],
  대전: [
    "건양대학교",
    "대전대학교",
    "목원대학교",
    "배재대학교",
    "우송대학교",
    "충남대학교",
    "한남대학교",
  ],
  광주: [
    "광주가톨릭대학교",
    "광주대학교",
    "광주여자대학교",
    "동신대학교",
    "조선대학교",
    "호남대학교",
  ],
  대구: [
    "계명대학교",
    "대구가톨릭대학교",
    "대구대학교",
    "대구한의대학교",
    "영남대학교",
  ],
  부산: [
    "경성대학교",
    "동명대학교",
    "동아대학교",
    "부경대학교",
    "부산가톨릭대학교",
    "부산대학교",
    "부산외국어대학교",
    "신라대학교",
    "영산대학교",
  ],
  울산: ["울산대학교", "울산과학기술원"],
  세종: ["한국교원대학교", "한국교통대학교"],
  강원: ["강릉원주대학교", "강원대학교", "상지대학교", "한림대학교"],
  충북: [
    "건국대학교 충주캠퍼스",
    "극동대학교",
    "대전대학교 충북캠퍼스",
    "청주대학교",
    "한국교통대학교 충북캠퍼스",
    "한국교원대학교 충북캠퍼스",
  ],
  충남: [
    "공주대학교",
    "단국대학교 천안캠퍼스",
    "백석대학교",
    "순천향대학교",
    "호서대학교",
  ],
  전북: ["군산대학교", "전북대학교", "전주대학교", "전주교육대학교"],
  전남: ["목포대학교", "순천대학교", "전남대학교", "호남대학교"],
  경북: [
    "경북대학교",
    "경일대학교",
    "경운대학교",
    "대구가톨릭대학교",
    "안동대학교",
    "영남대학교",
    "포항공과대학교",
  ],
  경남: [
    "경상대학교",
    "경남과학기술대학교",
    "창원대학교",
    "진주교육대학교",
    "창신대학교",
  ],
  제주: ["제주대학교", "제주국제대학교"],
};

const majors = [
  "인문계열",
  "사회계열",
  "자연계열",
  "공학계열",
  "의학계열",
  "예체능계열",
  "교육계열",
  "농수해양계열",
  "복합학",
];

const studentIds = Array.from({ length: 15 }, (_, i) => (10 + i).toString());

const enrollmentStatuses = ["재학중", "휴학중", "졸업"];

const certificationsList = [
  "정보처리기사",
  "정보보안기사",
  "전기기사",
  "산업안전기사",
  "건축기사",
  "기계설계기사",
  "소방설비기사",
  "환경기사",
  "화학분석기사",
  "식품기사",
];

interface Props {
  onComplete: (data: Partial<MentorData>) => void;
  onPrev: (data: Partial<MentorData>) => void;
  data: MentorData;
}

const MentorStep5: React.FC<Props> = ({ onComplete, onPrev, data }) => {
  const [university, setUniversity] = useState<string>(data.university || "");
  const [major, setMajor] = useState<string>(data.major || "");
  const [studentId, setStudentId] = useState<string>(data.studentId || "");
  const [enrollmentStatus, setEnrollmentStatus] = useState<string>(
    data.enrollmentStatus || ""
  );
  const [certifications, setCertifications] = useState<string>(
    data.certifications || ""
  );

  const [showModal, setShowModal] = useState<{
    type: string;
    isOpen: boolean;
  }>({ type: "", isOpen: false });

  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const handleComplete = () => {
    onComplete({
      university,
      major,
      studentId,
      enrollmentStatus,
      certifications,
    });
  };

  const handlePrev = () => {
    onPrev({ university, major, studentId, enrollmentStatus, certifications });
  };

  const handleModalOpen = (type: string) => {
    setShowModal({ type, isOpen: true });
    switch (type) {
      case "university":
        setFilteredItems(universitiesByCategory["전체"]);
        break;
      case "major":
        setFilteredItems(majors);
        break;
      case "studentId":
        setFilteredItems(studentIds);
        break;
      case "enrollmentStatus":
        setFilteredItems(enrollmentStatuses);
        break;
      case "certifications":
        setFilteredItems(certificationsList);
        break;
      default:
        setFilteredItems([]);
    }
  };

  const handleModalClose = () => {
    setShowModal({ type: "", isOpen: false });
  };

  const handleSearch = (query: string) => {
    const items: string[] =
      showModal.type === "university"
        ? universitiesByCategory[selectedCategory]
        : showModal.type === "major"
        ? majors
        : showModal.type === "studentId"
        ? studentIds
        : showModal.type === "enrollmentStatus"
        ? enrollmentStatuses
        : showModal.type === "certifications"
        ? certificationsList
        : [];

    const filtered = items.filter((item: string) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const renderModalContent = () => {
    if (showModal.type === "university") {
      return (
        <div className="d-flex modal-body-custom">
          <div className="sidebar">
            {Object.keys(universitiesByCategory).map((category) => (
              <div
                key={category}
                className={`sidebar-item ${
                  category === selectedCategory ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setFilteredItems(universitiesByCategory[category]);
                }}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="content">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setUniversity(item);
                  handleModalClose();
                }}
                className="modal-by-case-list"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (showModal.type === "university") setUniversity(item);
                if (showModal.type === "major") setMajor(item);
                if (showModal.type === "studentId") setStudentId(item);
                if (showModal.type === "enrollmentStatus")
                  setEnrollmentStatus(item);
                if (showModal.type === "certifications")
                  setCertifications(item);
                handleModalClose();
              }}
              className="modal-by-case-list"
            >
              {item}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="mentor-step-page container text-center p-0">
      <div className="mx-auto text-start">
        <div className="input-title mb-4">선생님의 정보를 알려주세요 !</div>

        <div className="form-group">
          <h6>대학</h6>
          <ModalInputDisplay
            displayText={university}
            onClick={() => handleModalOpen("university")}
            placeholder="대학 검색"
          />
        </div>

        <div className="form-group">
          <h6>학과</h6>
          <ModalInputDisplay
            displayText={major}
            onClick={() => handleModalOpen("major")}
            placeholder="학과 검색"
          />
        </div>

        <div className="form-group">
          <h6>학번</h6>
          <ModalInputDisplay
            displayText={studentId}
            onClick={() => handleModalOpen("studentId")}
            placeholder="학번 선택"
          />
        </div>

        <div className="form-group">
          <h6>재학 상태</h6>
          <ModalInputDisplay
            displayText={enrollmentStatus}
            onClick={() => handleModalOpen("enrollmentStatus")}
            placeholder="재학 상태 선택"
          />
        </div>

        <div className="form-group">
          <h6>자격증</h6>
          <ModalInputDisplay
            displayText={certifications}
            onClick={() => handleModalOpen("certifications")}
            placeholder="자격증 선택"
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button
            className="btn btn-primary w-50 ms-2"
            onClick={handleComplete}
            disabled={
              !university ||
              !major ||
              !studentId ||
              !enrollmentStatus ||
              !certifications
            }
          >
            완료
          </button>
        </div>
      </div>
      <ModalByCase
        show={showModal.isOpen}
        title={
          showModal.type === "university"
            ? "대학 선택"
            : showModal.type === "major"
            ? "학과 선택"
            : showModal.type === "studentId"
            ? "학번 선택"
            : showModal.type === "enrollmentStatus"
            ? "재학 상태 선택"
            : "자격증 선택"
        }
        content={renderModalContent()}
        onClose={handleModalClose}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default MentorStep5;
