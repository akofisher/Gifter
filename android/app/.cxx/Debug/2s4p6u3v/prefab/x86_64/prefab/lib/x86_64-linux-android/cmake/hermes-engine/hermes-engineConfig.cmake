if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/akosm3/.gradle/caches/8.14.1/transforms/8d7d9dd4035e800d040dc7b83870ac51/transformed/hermes-android-0.79.3-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/akosm3/.gradle/caches/8.14.1/transforms/8d7d9dd4035e800d040dc7b83870ac51/transformed/hermes-android-0.79.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

