if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/akosm3/.gradle/caches/8.14.1/transforms/776a1a8305afd6af12636aa5fe9ee8cc/transformed/hermes-android-0.79.3-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/akosm3/.gradle/caches/8.14.1/transforms/776a1a8305afd6af12636aa5fe9ee8cc/transformed/hermes-android-0.79.3-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

