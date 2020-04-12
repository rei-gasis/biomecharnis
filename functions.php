<?php
/*Init Parent functions*/
add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
function enqueue_parent_styles() {
   wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );

}

function get_arnis_systems(){
	/*Get all Arnis Systems*/
	$args = array(
            'post_type' => 'arnis_system',
            'post_status' => 'publish',
            'post_parent' => 0,
            'post_count' => 8
        	);

	$query = new WP_Query($args);

	$listCtr = 1;
	// foreach($query->posts as $post){
	// 	$post->viewerClass = "viewer_$listCtr";
	// 	$post->thumbnailImage = '1';

	// 	$listCtr++;
	// }

	return utf8_encode(json_encode($query->posts)); 
	// return json_encode($query->posts);
}
	



function register_route() {
    // register_rest_route() handles more arguments but we are going to stick to the basics for now.
    register_rest_route( 'arnis-systems', 'get', array(
        // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
        'methods'  => WP_REST_Server::READABLE,
        // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
        'callback' => 'get_arnis_systems',
    ) );
}
 
add_action( 'rest_api_init', 'register_route' );

// $args = array(
//             'post_type' => 'arnis_system',
//             'post_status' => 'publish',
//             'post_parent' => 0,
//             'post_count' => 8
//         	);

// 	$query = new WP_Query($args);


/*Add ACF Fields to Get request*/
add_action( 'rest_api_init', 'arnis_register_acf' );
function arnis_register_acf() {

  // return print_r(get_post_types(['public'=>true], 'names'));

  $post_types = get_post_types(['public'=>true], 'names');
  foreach ($post_types as $type) {
    register_rest_field( $type,
        'acf',
        array(
            'get_callback'    => 'arnis_get_acf',
            'update_callback' => null,
            'schema'          => null,
        )
    );


  }

  // print_r($post_types);
  
}
function arnis_get_acf( $object, $field_name, $request ) {
	$acf_fields = array('onsite_image_1' => get_post_meta($object[ 'id' ], 'onsite_image_1')
					   ,'onsite_image_2' => get_post_meta($object[ 'id' ], 'onsite_image_2')
					   ,'onsite_image_3' => get_post_meta($object[ 'id' ], 'onsite_image_3')

					   ,'grandmaster_name'  => get_post_meta($object[ 'id' ], 'grandmaster_name')
					   ,'about_grandmaster' => get_post_meta($object[ 'id' ], 'about_grandmaster')
					   ,'grandmaster_image' => get_post_meta($object[ 'id' ], 'grandmaster_image')
					   
					   ,'mocap'          => get_post_meta($object[ 'id' ], 'mocap')
					   ,'raw_video'      => get_post_meta($object[ 'id' ], 'raw_video')
					   ,'compare_video'  => get_post_meta($object[ 'id' ], 'compare_video')
				  );
    
	return $acf_fields;
    
}

/*Fix for transforming &#8211 (dash)*/
add_action( 'rest_api_init', function () {
    register_rest_field( 'arnis_system', 'title', array(
        'get_callback' => function( $arnis_array ) {
            return $arnis_array['title']['raw'];
        },
        'update_callback' => function( $karma, $comment_obj ) {
            // $ret = wp_update_comment( array(
            //     'comment_ID'    => $comment_obj->comment_ID,
            //     'comment_karma' => $karma
            // ) );
            // if ( false === $ret ) {
            //     return new WP_Error(
            //       'rest_comment_karma_failed',
            //       __( 'Failed to update comment karma.' ),
            //       array( 'status' => 500 )
            //     );
            // }
            // return true;
        },
        'schema' => array(
            'description' => null,
            'type'        => 'string'
        ),
    ) );
} );

?>



