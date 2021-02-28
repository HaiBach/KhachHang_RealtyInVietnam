export default function TemplateThumbnail(props) {
  const acf = props.acf

  return (
    <div className="template-thumbnail">
      
    </div>
  )
}


$is_show_featured_image = get_field('show_featured_image');
if ($is_show_featured_image !== false && has_post_thumbnail()) {
  echo '<div class="template-thumbnail">';

    if (has_post_thumbnail()) :
      echo '<div class="__thumbnail pc">';
        the_post_thumbnail('full');
      echo '</div>';
    endif;

    /** IMAGE FEATURE SP */ 
    $thumbnail_sp = get_field('thumbnail_sp');
    echo '<div class="__thumbnail sp">';
      if (!empty($thumbnail_sp)) :
        printf( '<img src="%s" alt="%s">', $thumbnail_sp['url'], $thumbnail_sp['title'] );
      else :
        the_post_thumbnail('full');
      endif;
    echo '</div>';
  
  echo '</div>';
}