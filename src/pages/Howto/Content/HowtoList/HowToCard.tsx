import {
  CategoryTag,
  Icon,
  ModerationStatus,
  Username,
  Tooltip,
} from 'oa-components'
import { Link as RouterLink } from 'react-router-dom'
import { isUserVerified } from 'src/common/isUserVerified'
import type { IHowtoDB } from 'src/models/howto.models'
import { cdnImageUrl } from 'src/utils/cdnImageUrl'
import { capitalizeFirstLetter } from 'src/utils/helpers'
import { Card, Flex, Heading, Text, Box, Image } from 'theme-ui'

interface IProps {
  howto: IHowtoDB & { taglist: any }
  votedUsefulCount: number
}

export const HowToCard = (props: IProps) => {
  const { howto, votedUsefulCount } = props
  return (
    <Card
      data-cy="card"
      data-cy-howto-slug={howto.slug}
      sx={{ borderRadius: 2, position: 'relative', height: '100%' }}
    >
      <Box>
        {howto.moderation !== 'accepted' && (
          <>
            <ModerationStatus
              status={howto.moderation}
              contentType="howto"
              sx={{ top: '62%', position: 'absolute', right: 0 }}
            />
          </>
        )}
        <RouterLink
          key={howto._id}
          to={`/how-to/${encodeURIComponent(howto.slug)}`}
          style={{ width: '100%' }}
        >
          <Flex
            sx={{
              width: '100%',
              fontSize: 0,
            }}
          >
            <Image
              style={{
                width: '100%',
                height: 'calc(((350px) / 3) * 2)',
                objectFit: 'cover',
              }}
              loading="lazy"
              src={
                cdnImageUrl(howto.cover_image?.downloadUrl || '') + '&width=500'
              }
              crossOrigin=""
            />
          </Flex>
        </RouterLink>

        <Flex sx={{ flexDirection: 'column', padding: 3, paddingBottom: 2 }}>
          <Flex
            sx={{
              flexDirection: 'column',
              height: 'calc(((350px) / 3) * 0.5)',
            }}
          >
            <Heading variant="small" color={'black'}>
              {/* HACK 2021-07-16 - new howtos auto capitalize title but not older */}
              <RouterLink
                key={howto._id}
                to={`/how-to/${encodeURIComponent(howto.slug)}`}
                style={{ width: '100%', color: 'black' }}
              >
                {capitalizeFirstLetter(howto.title)}
              </RouterLink>
            </Heading>
            <Flex sx={{ alignItems: 'center' }}>
              <Username
                user={{
                  userName: howto._createdBy,
                  countryCode: howto.creatorCountry,
                }}
                isVerified={isUserVerified(howto._createdBy)}
              />
            </Flex>
          </Flex>
          <Flex mt={5}>
            <Flex sx={{ flex: 1, flexWrap: 'wrap' }}>
              {howto.taglist &&
                howto.taglist.map((tag, idx) => (
                  <CategoryTag key={idx} tag={tag} sx={{ mr: 1 }} />
                ))}
            </Flex>
            {votedUsefulCount > 0 && (
              <Flex
                ml={1}
                sx={{ alignItems: 'center' }}
                data-tip="How useful is it"
              >
                <Icon glyph="star-active" marginRight="4px" />
                <Text color="black">{votedUsefulCount}</Text>
              </Flex>
            )}
            <Tooltip />
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
}

export default HowToCard
