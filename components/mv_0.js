

/** LẤY CÁC THAM SỐ TRÊN URL */
// $search = isset($_GET['search']) ? $_GET['search'] : '';
// $price = isset($_GET['price']) ? $_GET['price'] : '';
// $region = isset($_GET['region']) ? $_GET['region'] : '';
// $type = isset($_GET['type']) ? $_GET['type'] : '';
// $size = isset($_GET['size']) ? $_GET['size'] : '';
// $room = isset($_GET['room']) ? $_GET['room'] : '';

// // Chuyển đổi giá trị Price từ đường dẫn URL
// // Giá trị mặc định của price [0, 10000]
// $price_convert = array();
// $price_from = 0;
// $price_to = 10000;
// if (preg_match('/\;/', $price)) {
//   $price_convert = explode(';', $price);
//   $price_from = $price_convert[0];
//   $price_to = $price_convert[1];
// }

export default function MV() {
  return (
    <section className="home-mv --style1 anchor-first">
      {
        /** MV IMAGES */
        $mv_images = get_field('mv_images');
        $mv_images_sp = get_field('mv_images_sp');

        // Thiết lập hình ảnh mặc định
        if (empty($mv_images_sp)) {
          $mv_images_sp = $mv_images;
        }

        if (!empty($mv_images) && is_array($mv_images)) :
          $images_count = count($mv_images);

          echo '<div className="__image">';

            /** TH : CÓ 1 IMAGE */
            if ($images_count == 1) {
              $image = $mv_images[0];
              $image_sp = $mv_images_sp[0];
              
                printf( '<img className="pc" src="%s" alt="%s">', $image['url'], $image['title'] );
                printf( '<img className="sp" src="%s" alt="%s">', $image_sp['url'], $image_sp['title'] );
              
            }
          echo '</div>';
        endif;
      }

      <div className="__search">
        <div className="container --max-920">
          <form action="/for-rent/" method="GET">

            <div className="__deco sp">
              <div className="__title_deco">
                <img src="<?= get_template_directory_uri() ?>/imgs/mv-deco2.svg" alt="">
              </div>
              <div className="__btn_toggle">
                <div className="btn btn--lg">
                  <a href="/for-rent/">
                    <i className="icon-search2"></i>
                    <span className="btn__text">Search</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="__form pc">
              <div className="form__inner">
                <!-- FORM LEFT -->
                <div className="__left">
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --input --size-lg">
                        <input type="text" name="search" value="<?= $search ?>" placeholder="Search by ID, keyword...">
                      </div>
                    </div>
                  </div>

                  <div className="form__group --ranger">
                    <div className="form__row">
                      <div className="form__title"><label for="price">Price Range</label></div>
                      <div className="form__field">
                        <input type="text" className="range-slider" name="price" value="<?= $price ?>"
                          data-type="double"
                          data-grid="true"
                          data-min="0"
                          data-max="10000"
                          data-from="<?= $price_from ?>"
                          data-to="<?= $price_to ?>"
                          data-step="100"
                          data-prefix="$"
                        >
                      </div>
                    </div>
                  </div>

                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --select">
                        <select id="region" name="region">
                          {
                            // Render option của Select
                            $region_collect = array(
                              '' => '-- Region --',
                              '1' => 'District 1',
                              '2' => 'District 2',
                              '3' => 'District 3',
                              '4' => 'District 4',
                              '5' => 'District 5',
                              '6' => 'District 6',
                              '7' => 'District 7',
                              '8' => 'District 8',
                              '9' => 'District 9',
                              '10' => 'District 10',
                              '11' => 'District 11',
                              '12' => 'District 12',
                              'binh-tan' => 'Binh Tan District',
                              'binh-thanh' => 'Binh Tan District',
                              'go-vap' => 'Go Vap District',
                              'phu-nhuan' => 'Phu Nhuan District',
                              'tan-phu' => 'Tan Phu District',
                              'tan-binh' => 'Tan Binh District',
                              'thu-duc' => 'Thu Duc District',
                              'binh-chanh' => 'Binh Chanh District',
                              'can-gio' => 'Can Gio District',
                              'cu-chi' => 'Cu Chi District',
                              'hoc-mon' => 'Hoc Mon District',
                              'nha-be' => 'Nha Be District',
                              'other' => '-- Other --',
                            );

                            foreach ($region_collect as $key => $name) :
                              if ($region == $key) {
                                printf( '<option value="%s" selected>%s</option>', $key, $name );
                              }
                              else {
                                printf( '<option value="%s">%s</option>', $key, $name );
                              }
                            endforeach;
                            }
                        </select>
                      </div>
                      <div className="form__field --select">
                        <select id="type" name="type">
                          {
                            // Render option của Select Property Type
                            $type_collect = array(
                              '' => '-- Property Type --',
                              'apartment' => 'Apartment',
                              'service-apartment' => 'Service Apartment',
                              'house' => 'House / Shophouse',
                              'villa' => 'Villa',
                              'office' => 'Office',
                            );

                            foreach ($type_collect as $key => $name) :
                              if ($type == $key) {
                                printf( '<option value="%s" selected>%s</option>', $key, $name );
                              }
                              else {
                                printf( '<option value="%s">%s</option>', $key, $name );
                              }
                            endforeach;
                            }
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --select">
                        <select id="size" name="size">
                          {
                            // Render option của Select Property Size
                            $size_collect = array(
                              '' => '-- Size --',
                              '0-50' => '≦ 50 m²',
                              '51-100' => '51 m² ⟷ 100 m²',
                              '101-150' => '101 m² ⟷ 150 m²',
                              '151-200' => '151 m² ⟷ 200 m²',
                              '201-250' => '201 m² ⟷ 250 m²',
                              '251-350' => '251 m² ⟷ 350 m²',
                              '351-500' => '351 m² ⟷ 500 m²',
                              '501-10000' => '≧ 501 m²',
                            );

                            foreach ($size_collect as $key => $name) :
                              if ($size == $key) {
                                printf( '<option value="%s" selected>%s</option>', $key, $name );
                              }
                              else {
                                printf( '<option value="%s">%s</option>', $key, $name );
                              }
                            endforeach;
                            }
                        </select>
                      </div>
                      <div className="form__field --select">
                        <select id="room" name="room">
                          {
                            // Render option của Select Property Bedroom
                            $room_collect = array(
                              '' => '-- All Room --',
                              'studio' => 'Studio',
                              '1' => '1 Rooms',
                              '2' => '2 Rooms',
                              '3' => '3 Rooms',
                              '4' => '4 Rooms',
                              '5' => '5 Rooms',
                              '6' => '6 Rooms',
                              '7' => '7 Rooms',
                              '7-more' => '≧ 8 Rooms',
                            );

                            foreach ($room_collect as $key => $name) :
                              if ($room == $key) {
                                printf( '<option value="%s" selected>%s</option>', $key, $name );
                              }
                              else {
                                printf( '<option value="%s">%s</option>', $key, $name );
                              }
                            endforeach;
                            }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="__right">
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --btn">
                        <div className="btn btn--lg">
                          <button type="submit">
                            <span className="btn__text"><i className="icon-search"></i>SEARCH</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --btn">
                        <div className="btn btn--transparent">
                          <a href="/for-rent/">
                            <span className="btn__text"><i className="icon-reset"></i>RESET</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </section>
  )
}