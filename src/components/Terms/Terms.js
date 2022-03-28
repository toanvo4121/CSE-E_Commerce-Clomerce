import React from 'react'
import Footer from '../Footer'
import PageInfo from '../PageInfo/PageInfo'
import Header from '../Header'

function Terms() {
    return (
        <>
            <Header />
            <div style={{ marginTop: '76px' }}></div>
            <PageInfo>
                <p className="page-info">TERMS & CONDITIONS</p>
            </PageInfo>
            <div className="container my-5 py-2">
                <h4>
                    <strong>
                        1. Giới thiệu
                    </strong>
                    <hr />
                </h4>
                <p>
                    Chào mừng quý khách hàng đến với website chúng tôi.

                    Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.

                    Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
                </p>
                <br />
                <h4>
                    <strong>
                        2. Hướng dẫn sử dụng website
                    </strong>
                    <hr />
                </h4>
                <p>
                    Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.

                    Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.


                </p>
                <br />
                <h4>
                    <strong>
                        3. Thanh toán an toàn và tiện lợi
                    </strong>
                    <hr />
                </h4>
                <p>
                    Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
                    <br />
                    <strong>Cách 1:</strong> Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)
                    <br />
                    <strong>Cách 2:</strong> Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
                    <br />
                    <strong>Cách 3:</strong> Thanh toán online qua thẻ tín dụng, chuyển khoản
                </p>
            </div>
            <Footer />
        </>
    )
}

export default Terms