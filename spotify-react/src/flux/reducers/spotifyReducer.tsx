import {
    GET_LIKED_SONGS,GET_PLAYLIST_SONGS
  } from '../actions/types';
  
  const initialState = {
    likedSongs: [
      {
        added_at: '2021-07-02T16:25:55Z',
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/6D6rjLdxyE5vwhMlkuQq0E'
                },
                href: 'https://api.spotify.com/v1/artists/6D6rjLdxyE5vwhMlkuQq0E',
                id: '6D6rjLdxyE5vwhMlkuQq0E',
                name: 'Chaos Chaos',
                type: 'artist',
                uri: 'spotify:artist:6D6rjLdxyE5vwhMlkuQq0E'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/061IeHu2QcmToSRzRkzeqM'
            },
            href: 'https://api.spotify.com/v1/albums/061IeHu2QcmToSRzRkzeqM',
            id: '061IeHu2QcmToSRzRkzeqM',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b2732d50a845cd4b8d7863320bff',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e022d50a845cd4b8d7863320bff',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d000048512d50a845cd4b8d7863320bff',
                width: 64
              }
            ],
            name: 'Committed to the Crime',
            release_date: '2014-10-07',
            release_date_precision: 'day',
            total_tracks: 6,
            type: 'album',
            uri: 'spotify:album:061IeHu2QcmToSRzRkzeqM'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6D6rjLdxyE5vwhMlkuQq0E'
              },
              href: 'https://api.spotify.com/v1/artists/6D6rjLdxyE5vwhMlkuQq0E',
              id: '6D6rjLdxyE5vwhMlkuQq0E',
              name: 'Chaos Chaos',
              type: 'artist',
              uri: 'spotify:artist:6D6rjLdxyE5vwhMlkuQq0E'
            }
          ],
          disc_number: 1,
          duration_ms: 250712,
          explicit: false,
          external_ids: {
            isrc: 'ushm81465326'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/3lOok0REf4j3790abX26PR'
          },
          href: 'https://api.spotify.com/v1/tracks/3lOok0REf4j3790abX26PR',
          id: '3lOok0REf4j3790abX26PR',
          is_local: false,
          is_playable: true,
          name: 'Do You Feel It?',
          popularity: 60,
          preview_url: 'https://p.scdn.co/mp3-preview/be45276d8719ba19a29d6779f70d8d13d288f310?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 3,
          type: 'track',
          uri: 'spotify:track:3lOok0REf4j3790abX26PR'
        }
      },
      {
        added_at: '2021-06-29T03:13:23Z',
        track: {
          album: {
            album_type: 'album',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/3SFVchRRMmFuOi3Azi0vTo'
                },
                href: 'https://api.spotify.com/v1/artists/3SFVchRRMmFuOi3Azi0vTo',
                id: '3SFVchRRMmFuOi3Azi0vTo',
                name: 'Saving Jane',
                type: 'artist',
                uri: 'spotify:artist:3SFVchRRMmFuOi3Azi0vTo'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/1e9SZbKslz4wsj75bm5rfV'
            },
            href: 'https://api.spotify.com/v1/albums/1e9SZbKslz4wsj75bm5rfV',
            id: '1e9SZbKslz4wsj75bm5rfV',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b273109d4ab200942caa98e05d07',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e02109d4ab200942caa98e05d07',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d00004851109d4ab200942caa98e05d07',
                width: 64
              }
            ],
            name: 'The Singles',
            release_date: '2011',
            release_date_precision: 'year',
            total_tracks: 16,
            type: 'album',
            uri: 'spotify:album:1e9SZbKslz4wsj75bm5rfV'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/3SFVchRRMmFuOi3Azi0vTo'
              },
              href: 'https://api.spotify.com/v1/artists/3SFVchRRMmFuOi3Azi0vTo',
              id: '3SFVchRRMmFuOi3Azi0vTo',
              name: 'Saving Jane',
              type: 'artist',
              uri: 'spotify:artist:3SFVchRRMmFuOi3Azi0vTo'
            }
          ],
          disc_number: 1,
          duration_ms: 176840,
          explicit: false,
          external_ids: {
            isrc: 'US2G40801882'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/3G8FsbEixH0iJwu8KwsTy8'
          },
          href: 'https://api.spotify.com/v1/tracks/3G8FsbEixH0iJwu8KwsTy8',
          id: '3G8FsbEixH0iJwu8KwsTy8',
          is_local: false,
          is_playable: true,
          name: 'Supergirl',
          popularity: 32,
          preview_url: 'https://p.scdn.co/mp3-preview/a4b18d476b8db8732d1050efad15bf37b48ed418?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 2,
          type: 'track',
          uri: 'spotify:track:3G8FsbEixH0iJwu8KwsTy8'
        }
      },
      {
        added_at: '2021-06-27T10:21:52Z',
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/41X1TR6hrK8Q2ZCpp2EqCz'
                },
                href: 'https://api.spotify.com/v1/artists/41X1TR6hrK8Q2ZCpp2EqCz',
                id: '41X1TR6hrK8Q2ZCpp2EqCz',
                name: 'bbno$',
                type: 'artist',
                uri: 'spotify:artist:41X1TR6hrK8Q2ZCpp2EqCz'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/7sAAPOgQ1UNo0iozBiqNQX'
            },
            href: 'https://api.spotify.com/v1/albums/7sAAPOgQ1UNo0iozBiqNQX',
            id: '7sAAPOgQ1UNo0iozBiqNQX',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b273c1539f1f65ca365e846f8f60',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e02c1539f1f65ca365e846f8f60',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d00004851c1539f1f65ca365e846f8f60',
                width: 64
              }
            ],
            name: 'my oh my',
            release_date: '2021-05-14',
            release_date_precision: 'day',
            total_tracks: 5,
            type: 'album',
            uri: 'spotify:album:7sAAPOgQ1UNo0iozBiqNQX'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/41X1TR6hrK8Q2ZCpp2EqCz'
              },
              href: 'https://api.spotify.com/v1/artists/41X1TR6hrK8Q2ZCpp2EqCz',
              id: '41X1TR6hrK8Q2ZCpp2EqCz',
              name: 'bbno$',
              type: 'artist',
              uri: 'spotify:artist:41X1TR6hrK8Q2ZCpp2EqCz'
            }
          ],
          disc_number: 1,
          duration_ms: 155555,
          explicit: false,
          external_ids: {
            isrc: 'QMUY42100071'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/13bwrVGjmhOqDdw9MiaS76'
          },
          href: 'https://api.spotify.com/v1/tracks/13bwrVGjmhOqDdw9MiaS76',
          id: '13bwrVGjmhOqDdw9MiaS76',
          is_local: false,
          is_playable: true,
          name: 'my oh my',
          popularity: 62,
          preview_url: 'https://p.scdn.co/mp3-preview/a95a022ed253141ce4d96d440cb5ce918a528b80?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 2,
          type: 'track',
          uri: 'spotify:track:13bwrVGjmhOqDdw9MiaS76'
        }
      },
      {
        added_at: '2021-06-27T09:13:30Z',
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/0FizvTDN8BVHmV5j2fL9Hf'
                },
                href: 'https://api.spotify.com/v1/artists/0FizvTDN8BVHmV5j2fL9Hf',
                id: '0FizvTDN8BVHmV5j2fL9Hf',
                name: 'Sally Boy',
                type: 'artist',
                uri: 'spotify:artist:0FizvTDN8BVHmV5j2fL9Hf'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/7tf1B0szpLaftMECpvPYWh'
            },
            href: 'https://api.spotify.com/v1/albums/7tf1B0szpLaftMECpvPYWh',
            id: '7tf1B0szpLaftMECpvPYWh',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b273c9eafb6af2ae64e499dc4553',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e02c9eafb6af2ae64e499dc4553',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d00004851c9eafb6af2ae64e499dc4553',
                width: 64
              }
            ],
            name: 'Chess & Checkers',
            release_date: '2021-06-02',
            release_date_precision: 'day',
            total_tracks: 1,
            type: 'album',
            uri: 'spotify:album:7tf1B0szpLaftMECpvPYWh'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/0FizvTDN8BVHmV5j2fL9Hf'
              },
              href: 'https://api.spotify.com/v1/artists/0FizvTDN8BVHmV5j2fL9Hf',
              id: '0FizvTDN8BVHmV5j2fL9Hf',
              name: 'Sally Boy',
              type: 'artist',
              uri: 'spotify:artist:0FizvTDN8BVHmV5j2fL9Hf'
            }
          ],
          disc_number: 1,
          duration_ms: 149456,
          explicit: false,
          external_ids: {
            isrc: 'USRC12101382'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/7I1L8djBxdsQGtybPXSeMZ'
          },
          href: 'https://api.spotify.com/v1/tracks/7I1L8djBxdsQGtybPXSeMZ',
          id: '7I1L8djBxdsQGtybPXSeMZ',
          is_local: false,
          is_playable: true,
          name: 'Chess & Checkers',
          popularity: 50,
          preview_url: 'https://p.scdn.co/mp3-preview/838323b7ea663c6fb69dc6d4351c4b0dc896a5fd?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:7I1L8djBxdsQGtybPXSeMZ'
        }
      },
      {
        added_at: '2021-06-27T08:30:58Z',
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/2AfU5LYBVCiCtuCCfM7uVX'
                },
                href: 'https://api.spotify.com/v1/artists/2AfU5LYBVCiCtuCCfM7uVX',
                id: '2AfU5LYBVCiCtuCCfM7uVX',
                name: 'Kota the Friend',
                type: 'artist',
                uri: 'spotify:artist:2AfU5LYBVCiCtuCCfM7uVX'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/2xIwaswWMyUtM5h8wxA5gH'
            },
            href: 'https://api.spotify.com/v1/albums/2xIwaswWMyUtM5h8wxA5gH',
            id: '2xIwaswWMyUtM5h8wxA5gH',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b2738daa0157da70aa3f36781874',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e028daa0157da70aa3f36781874',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d000048518daa0157da70aa3f36781874',
                width: 64
              }
            ],
            name: 'Outside',
            release_date: '2021-04-21',
            release_date_precision: 'day',
            total_tracks: 1,
            type: 'album',
            uri: 'spotify:album:2xIwaswWMyUtM5h8wxA5gH'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/2AfU5LYBVCiCtuCCfM7uVX'
              },
              href: 'https://api.spotify.com/v1/artists/2AfU5LYBVCiCtuCCfM7uVX',
              id: '2AfU5LYBVCiCtuCCfM7uVX',
              name: 'Kota the Friend',
              type: 'artist',
              uri: 'spotify:artist:2AfU5LYBVCiCtuCCfM7uVX'
            }
          ],
          disc_number: 1,
          duration_ms: 203793,
          explicit: true,
          external_ids: {
            isrc: 'QZLBC2100095'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/2i40wZkiPAGIFudrGH99nx'
          },
          href: 'https://api.spotify.com/v1/tracks/2i40wZkiPAGIFudrGH99nx',
          id: '2i40wZkiPAGIFudrGH99nx',
          is_local: false,
          is_playable: true,
          name: 'Outside',
          popularity: 63,
          preview_url: 'https://p.scdn.co/mp3-preview/f54844fa1ebf107ff43967600924a0654a9e6d91?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:2i40wZkiPAGIFudrGH99nx'
        }
      },
      {
        added_at: '2021-06-27T08:30:40Z',
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/7MigDh04CCntQbsBvugEmb'
                },
                href: 'https://api.spotify.com/v1/artists/7MigDh04CCntQbsBvugEmb',
                id: '7MigDh04CCntQbsBvugEmb',
                name: 'Marlon Craft',
                type: 'artist',
                uri: 'spotify:artist:7MigDh04CCntQbsBvugEmb'
              },
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/6DysNxLSnpEp0dx8hp5DqL'
                },
                href: 'https://api.spotify.com/v1/artists/6DysNxLSnpEp0dx8hp5DqL',
                id: '6DysNxLSnpEp0dx8hp5DqL',
                name: 'Yusei',
                type: 'artist',
                uri: 'spotify:artist:6DysNxLSnpEp0dx8hp5DqL'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/2VCNkdRoJ6VG7fMwXie3VK'
            },
            href: 'https://api.spotify.com/v1/albums/2VCNkdRoJ6VG7fMwXie3VK',
            id: '2VCNkdRoJ6VG7fMwXie3VK',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b2733c46c7bf66e8c8bf24909407',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e023c46c7bf66e8c8bf24909407',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d000048513c46c7bf66e8c8bf24909407',
                width: 64
              }
            ],
            name: 'Can\'t Call It',
            release_date: '2021-04-21',
            release_date_precision: 'day',
            total_tracks: 1,
            type: 'album',
            uri: 'spotify:album:2VCNkdRoJ6VG7fMwXie3VK'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/7MigDh04CCntQbsBvugEmb'
              },
              href: 'https://api.spotify.com/v1/artists/7MigDh04CCntQbsBvugEmb',
              id: '7MigDh04CCntQbsBvugEmb',
              name: 'Marlon Craft',
              type: 'artist',
              uri: 'spotify:artist:7MigDh04CCntQbsBvugEmb'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6DysNxLSnpEp0dx8hp5DqL'
              },
              href: 'https://api.spotify.com/v1/artists/6DysNxLSnpEp0dx8hp5DqL',
              id: '6DysNxLSnpEp0dx8hp5DqL',
              name: 'Yusei',
              type: 'artist',
              uri: 'spotify:artist:6DysNxLSnpEp0dx8hp5DqL'
            }
          ],
          disc_number: 1,
          duration_ms: 172968,
          explicit: true,
          external_ids: {
            isrc: 'QZES82199368'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/3rGiOkIZn7RjO0yOlZCUcx'
          },
          href: 'https://api.spotify.com/v1/tracks/3rGiOkIZn7RjO0yOlZCUcx',
          id: '3rGiOkIZn7RjO0yOlZCUcx',
          is_local: false,
          is_playable: true,
          name: 'Can\'t Call It',
          popularity: 53,
          preview_url: 'https://p.scdn.co/mp3-preview/0b3099deb058bcb31b290e97b6b3b4310009f549?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:3rGiOkIZn7RjO0yOlZCUcx'
        }
      },
      {
        added_at: '2021-06-27T08:30:31Z',
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/0huGjMyP507tBCARyzSkrv'
                },
                href: 'https://api.spotify.com/v1/artists/0huGjMyP507tBCARyzSkrv',
                id: '0huGjMyP507tBCARyzSkrv',
                name: 'Cordae',
                type: 'artist',
                uri: 'spotify:artist:0huGjMyP507tBCARyzSkrv'
              },
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/2GHclqNVjqGuiE5mA7BEoc'
                },
                href: 'https://api.spotify.com/v1/artists/2GHclqNVjqGuiE5mA7BEoc',
                id: '2GHclqNVjqGuiE5mA7BEoc',
                name: 'Common',
                type: 'artist',
                uri: 'spotify:artist:2GHclqNVjqGuiE5mA7BEoc'
              }
            ],
            external_urls: {
              spotify: 'https://open.spotify.com/album/6UzuK8kBzwIpKbEex4BouB'
            },
            href: 'https://api.spotify.com/v1/albums/6UzuK8kBzwIpKbEex4BouB',
            id: '6UzuK8kBzwIpKbEex4BouB',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b273e0193806e8e3350098475cff',
                width: 640
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e02e0193806e8e3350098475cff',
                width: 300
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d00004851e0193806e8e3350098475cff',
                width: 64
              }
            ],
            name: 'What\'s Life (From "Liberated / Music For the Movement Vol. 3")',
            release_date: '2021-06-18',
            release_date_precision: 'day',
            total_tracks: 1,
            type: 'album',
            uri: 'spotify:album:6UzuK8kBzwIpKbEex4BouB'
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/0huGjMyP507tBCARyzSkrv'
              },
              href: 'https://api.spotify.com/v1/artists/0huGjMyP507tBCARyzSkrv',
              id: '0huGjMyP507tBCARyzSkrv',
              name: 'Cordae',
              type: 'artist',
              uri: 'spotify:artist:0huGjMyP507tBCARyzSkrv'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/2GHclqNVjqGuiE5mA7BEoc'
              },
              href: 'https://api.spotify.com/v1/artists/2GHclqNVjqGuiE5mA7BEoc',
              id: '2GHclqNVjqGuiE5mA7BEoc',
              name: 'Common',
              type: 'artist',
              uri: 'spotify:artist:2GHclqNVjqGuiE5mA7BEoc'
            }
          ],
          disc_number: 1,
          duration_ms: 191088,
          explicit: true,
          external_ids: {
            isrc: 'USHR12141633'
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/2VfMFlfRbk2BAQ9sBZALg3'
          },
          href: 'https://api.spotify.com/v1/tracks/2VfMFlfRbk2BAQ9sBZALg3',
          id: '2VfMFlfRbk2BAQ9sBZALg3',
          is_local: false,
          is_playable: true,
          name: 'What\'s Life - From "Liberated / Music For the Movement Vol. 3"',
          popularity: 62,
          preview_url: 'https://p.scdn.co/mp3-preview/31b3bad7d4c37f0494038c07c455e500898ace4b?cid=300ac0b33203415b98bd63ec4146c74c',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:2VfMFlfRbk2BAQ9sBZALg3'
        }
      }
    ]
  };
  export default function(state = initialState, action: any) {
    switch (action.type) {
      case GET_LIKED_SONGS:
        console.log("SpotifyReducer Ran")
        console.log(action.payload)
        return {
          ...state,
          likedSongs: action.payload,
          loading: false
      };
      case GET_PLAYLIST_SONGS:
        console.log("SpotifyReducer Ran")
        console.log(action.payload)
        return {
          ...state,
          likedSongs: action.payload,
          loading: false
      };
      default:
        return state;
    }
  }
  