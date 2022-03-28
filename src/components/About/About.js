import React from 'react'

import PageInfo from '../PageInfo/PageInfo'
import Header from '../Header'
import Footer from '../Footer'

function About() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '76px' }}></div>
      <PageInfo>
        <p className='page-info'>ABOUT</p>
      </PageInfo>
      <div className='container my-5 py-2'>
        <h4>
          <strong>CloMerce: Best Local brand in your area</strong>
          <hr />
        </h4>
        <p>
          CloMerce là local brand được thành lập và xuất hiện lần đầu tiên vào
          đầu tháng 03-2022.
        </p>
        <p>
          Với nỗ lực không ngừng CloMerce đã mang đến một góc nhìn khác hơn về
          giá thành của thương hiệu VIỆT
        </p>
        <p>
          Bước ngoặc lớn nhất vào tháng 03-2022 CloMerce tự hào là local đầu
          tiên đưa sản phẩm về mức giá #SALE 99K nhưng vẫn đảm bảo tuyệt đối
          chất lượng đầu ra của thương hiệu với tiêu chí : “ rẻ - đẹp - chất
          lượng “
        </p>
        <p>
          Và hứa hẹn trong tương lai chúng ta sẽ cùng bùng nổ hơn nữa chứ không
          phải chỉ riêng khoảnh khắc này
        </p>
        <p>
          Hãy cùng nhau đón chờ những sản phẩm mới nhất từ CloMerce nhé. Cảm ơn
          các bạn rất nhiều!
        </p>
      </div>
      <Footer />
    </>
  )
}

export default About
