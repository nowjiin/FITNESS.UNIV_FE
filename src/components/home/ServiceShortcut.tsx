import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./ServiceShortcut.scss"; // 스타일 시트를 가져옵니다.

const ServiceShortcut = () => {
  const services = [
    {
      title: "과외학생 찾기",
      description: "144만 학생/학부모에게\n무제한 과외제안",
      icon: "../../icons/paperAirplane.svg",
      color: "#d9fcf6",
      titleColor: "rgb(17 182 154)", // 추가된 titleColor 속성
    },
    {
      title: "이용내역",
      description: "내 과외 내역\n한눈에 보기",
      icon: "../../icons/guidebook.svg",
      color: "#cff1ff",
      titleColor: "rgb(0 148 255)", // 추가된 titleColor 속성
    },
    {
      title: "선생님 광장",
      description: "52만 선생님과\n함께하는 커뮤니티",
      icon: "../../icons/Loudspeaker_Purple.svg",
      color: "rgb(248 241 255)",
      titleColor: "rgb(129 103 235)", // 추가된 titleColor 속성
    },
    {
      title: "멘토링",
      description: "나의 지식과 재능을\n학생들과 나누는 공간",
      icon: "../../icons/QandA_orange.svg",
      color: "rgb(255 248 234)",
      titleColor: "rgb(255 109 0)", // 추가된 titleColor 속성
    },
    {
      title: "학습자료 찾기",
      description: "수업 퀄리티를 올려줄\n고퀄 자료 다운받기",
      icon: "../../icons/folder.svg",
      color: "rgb(255 248 234)",
      titleColor: "rgb(255 109 0)", // 추가된 titleColor 속성
    },
    {
      title: "학원강사 채용공고",
      description: "원하는 학원에\n즉시 지원하기",
      icon: "../../icons/bag.svg",
      color: "rgb(248 248 248)",
      titleColor: "rgb(68 68 68)", // 추가된 titleColor 속성
    },
  ];

  return (
    <Container className="mt-4">
      <h4>서비스 바로가기</h4>
      <Row>
        {services.map((service, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card
              className="h-100 service-card"
              style={{ backgroundColor: service.color }}
            >
              <Card.Body className="d-flex align-items-center">
                <div className="me-3 service-icon">
                  <img
                    src={service.icon}
                    alt={service.title}
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
                <div>
                  <Card.Title
                    className="service-title"
                    style={{ color: service.titleColor }}
                  >
                    {service.title}
                  </Card.Title>
                  <Card.Text className="service-description">
                    {service.description}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceShortcut;
