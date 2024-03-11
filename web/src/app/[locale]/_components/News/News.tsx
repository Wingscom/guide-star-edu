import { getScopedI18n } from "@/locales/server";
import { BlogCategory } from "@/types/BlogCategory";
import { Container, SimpleGrid, Stack, Title } from "@mantine/core";
import { NewsCard } from "./NewsCard";

const data = [
  {
    slug: "test-slug-1",
    image:
      "https://pse.edu.vn/wp-content/uploads/2022/03/CBU_ICEAPS_facebook.jpg",
    title:
      "BUỔI GIAO LƯU: CƠ HỘI HỌC TẬP, LÀM VIỆC VÀ ĐỊNH CƯ TẠI NOVA SCOTIA CÙNG ĐẠI DIỆN TRƯỜNG ĐẠI HỌC CAPE BRETON- CANADA",
    description: `
    Trong tháng 3 này, PSE Education xin kính mời toàn thể các phụ huynh và các bạn học sinh đến với buối Coffee Talk: “Cơ hội học tập, làm việc và định cư tại Nova Scotia cùng trường đại học Cape Breton – Canada”. Tham dự sự kiện, khách sẽ được miễn phí nước uống, nghe chia sẻ của các chuyên gia và nhận phần quà hấp dẫn từ chương trình.

Thông tin chi tiết về sự kiện
      Thời gian tổ chức: 09h00 – 11h00 ngày 19 & 20/03/2022

     Địa điểm: Sunshine Book Coffee, 19 Pasteur, Đà Nẵng

     Cách đăng ký: Các bạn hãy quét mã QR sau để đăng ký nhé

hoặc đăng ký trực tiếp tại đường link: https://by.com.vn/ptU63W

Tại sao nên tham dự chương trình này?

Tìm hiểu cơ hội học tập, làm việc và định cư tại Nova Scotia cùng trường đại học Cape Breton
Có thể mang theo hồ sơ học tập để được tư vấn và định hướng ngay trong chương trình
Được tư vấn và trao đổi trực tiếp cùng đại diện trường
Cơ hội Mix & Mattch học bổng tại trường CBU
Cập nhật xu hướng nghề nghiệp tương lại tại Canada
Cập nhật thông tin, chính sách định cư mở rộng của chính phủ Canada
Được hỗ trợ tư vấn hồ sơ du học và hồ sơ xin visa miễn phí
► Đặc biệt: 5 bạn đầu tiên nộp hồ sơ tại chương trình trong ngày 19 & 20/03/2022 sẽ có cơ hội nhận được voucher vé máy bay lên đến 10.000.000 VNĐ.
    `,
    date: "20/03/2024",
    category: BlogCategory.Event,
  },
  {
    slug: "test-slug-2",
    image:
      "https://pse.edu.vn/wp-content/uploads/2022/03/CBU_ICEAPS_facebook.jpg",
    title:
      "BUỔI GIAO LƯU: CƠ HỘI HỌC TẬP, LÀM VIỆC VÀ ĐỊNH CƯ TẠI NOVA SCOTIA CÙNG ĐẠI DIỆN TRƯỜNG ĐẠI HỌC CAPE BRETON- CANADA",
    description: `
    Trong tháng 3 này, PSE Education xin kính mời toàn thể các phụ huynh và các bạn học sinh đến với buối Coffee Talk: “Cơ hội học tập, làm việc và định cư tại Nova Scotia cùng trường đại học Cape Breton – Canada”. Tham dự sự kiện, khách sẽ được miễn phí nước uống, nghe chia sẻ của các chuyên gia và nhận phần quà hấp dẫn từ chương trình.

Thông tin chi tiết về sự kiện
      Thời gian tổ chức: 09h00 – 11h00 ngày 19 & 20/03/2022

     Địa điểm: Sunshine Book Coffee, 19 Pasteur, Đà Nẵng

     Cách đăng ký: Các bạn hãy quét mã QR sau để đăng ký nhé

hoặc đăng ký trực tiếp tại đường link: https://by.com.vn/ptU63W

Tại sao nên tham dự chương trình này?

Tìm hiểu cơ hội học tập, làm việc và định cư tại Nova Scotia cùng trường đại học Cape Breton
Có thể mang theo hồ sơ học tập để được tư vấn và định hướng ngay trong chương trình
Được tư vấn và trao đổi trực tiếp cùng đại diện trường
Cơ hội Mix & Mattch học bổng tại trường CBU
Cập nhật xu hướng nghề nghiệp tương lại tại Canada
Cập nhật thông tin, chính sách định cư mở rộng của chính phủ Canada
Được hỗ trợ tư vấn hồ sơ du học và hồ sơ xin visa miễn phí
► Đặc biệt: 5 bạn đầu tiên nộp hồ sơ tại chương trình trong ngày 19 & 20/03/2022 sẽ có cơ hội nhận được voucher vé máy bay lên đến 10.000.000 VNĐ.
    `,
    date: "20/03/2024",
    category: BlogCategory.News,
  },
  {
    slug: "test-slug-3",
    image:
      "https://pse.edu.vn/wp-content/uploads/2022/03/CBU_ICEAPS_facebook.jpg",
    title:
      "BUỔI GIAO LƯU: CƠ HỘI HỌC TẬP, LÀM VIỆC VÀ ĐỊNH CƯ TẠI NOVA SCOTIA CÙNG ĐẠI DIỆN TRƯỜNG ĐẠI HỌC CAPE BRETON- CANADA",
    description: `
    Trong tháng 3 này, PSE Education xin kính mời toàn thể các phụ huynh và các bạn học sinh đến với buối Coffee Talk: “Cơ hội học tập, làm việc và định cư tại Nova Scotia cùng trường đại học Cape Breton – Canada”. Tham dự sự kiện, khách sẽ được miễn phí nước uống, nghe chia sẻ của các chuyên gia và nhận phần quà hấp dẫn từ chương trình.

Thông tin chi tiết về sự kiện
      Thời gian tổ chức: 09h00 – 11h00 ngày 19 & 20/03/2022

     Địa điểm: Sunshine Book Coffee, 19 Pasteur, Đà Nẵng

     Cách đăng ký: Các bạn hãy quét mã QR sau để đăng ký nhé

hoặc đăng ký trực tiếp tại đường link: https://by.com.vn/ptU63W

Tại sao nên tham dự chương trình này?

Tìm hiểu cơ hội học tập, làm việc và định cư tại Nova Scotia cùng trường đại học Cape Breton
Có thể mang theo hồ sơ học tập để được tư vấn và định hướng ngay trong chương trình
Được tư vấn và trao đổi trực tiếp cùng đại diện trường
Cơ hội Mix & Mattch học bổng tại trường CBU
Cập nhật xu hướng nghề nghiệp tương lại tại Canada
Cập nhật thông tin, chính sách định cư mở rộng của chính phủ Canada
Được hỗ trợ tư vấn hồ sơ du học và hồ sơ xin visa miễn phí
► Đặc biệt: 5 bạn đầu tiên nộp hồ sơ tại chương trình trong ngày 19 & 20/03/2022 sẽ có cơ hội nhận được voucher vé máy bay lên đến 10.000.000 VNĐ.
    `,
    date: "20/03/2024",
    category: BlogCategory.Scholarship,
  },
];

export async function News() {
  const pageT = await getScopedI18n("home");
  return (
    <Container size="xl" p="lg">
      <Stack align="center">
        <Title order={2} mb="lg">
          {pageT("labels.news")}
        </Title>
        <SimpleGrid cols={3}>
          {data.map((item) => (
            <NewsCard key={item.slug} {...item} link={`/blogs/${item.slug}`} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
