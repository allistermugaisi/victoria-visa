let blogContent = document.getElementById('blog-content');

let AUTH_TOKEN =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTk3MTU1MDQsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w2Z2dodmcyM2ViMzAxdGE0MzVqYTRpei9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDkxYTJhOTYtNjAyZi00MGY5LWJjOGItYjJhMmIzNzFiY2U4IiwianRpIjoiY2w2Z25yYjZ0M2U1ZjAxdWhmdHlzZWR2NiJ9.FPBVmnPNhZA9JzERQvsu1ak_85vrBlxPz98KFrR99ajGJeklVkn8t5g84wTzzpTjNFZpDE268SSbxBRF7PgQVAgO6AX0nXzT9MQp4luZL9ZT55b-H7pzzb7HWC5xbNjYqA5sQNvrhxzJyv7JYumr7TrtnvfIeFaEehjnI-zSx4VlwT9ELg9uTrZ90kWYFqRdvuKrKsCtKBs5JfytXGF9UEpwGJLVdOtwc3NKHu4fG7IQGy6CktgpkKV3AvrLyHztCLSVmdDXm5HLy29-NuD7VvuZrTtlcj4mg7XOzWCKoHPPLHMWoA1pBMPJj_gcP_eLbNEOzk5e3DE12IerdEyI7Ubgz1vYTUk4ZqvSqCaTRln0OhXm3lQUVGLkgRAzaQiPS7n3zkA_vrdHq6nz_cuq9OXGPg150GBXCFF3GmWL7DbZJ4L-q3DlwaWfUGRk3_ggH9S2555n5a-Am8KCTLX_We-P82XkaS2HWsY4ZgMU2B8hIiJ0omQWdkINueq8OaD-G6AV2eTaBYVm3x0-M23Vl4ibKFo3dHzP3QxGnUunw0-ygEC2js9VOGiw92ujFh5XJ2p5R58ZrpcfHzWiXPbF8TPPFo61fPUovBwGm4yD6LpyqtO1W1U8I0ehzCdDk-FAEjkWVBrq9E5eFYEkF8xVXTJYJ1HoFGYJjEOwsGO7rvU';

fetch('https://api-eu-west-2.hygraph.com/v2/cl6gghvg23eb301ta435ja4iz/master', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${AUTH_TOKEN}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		query: `
        query {
            posts {
              id
              title
              slug
              subTitle
              title
              datePublished
              content {
                raw
                html
                markdown
                text
              }
              photo {
                id
                handle
                fileName
                mimeType
                url
              }
              category {
                entryId: id
                title
              }
              author {
                id
                name
              }
              updatedBy {
                entryId: id
                name
                picture
                kind
                isActive
              }
            }
          }
        `,
	}),
})
	.then((res) => res.json())
	.then((result) => {
		return result.data.posts.forEach((post) => {
			const {
				author,
				title,
				subTitle,
				category,
				photo,
				content: { markdown, html },
				datePublished,
			} = post;
			// console.log(html);

			let article = `
            		<div>
						<div>
							<img
								src=${photo[0]?.url}
								alt=${photo[0]?.fileName}
							/>
						</div>
						<div class="py-8">
							<h5>
								<span class="text-red-500">${category[0]?.title}</span>
								<span class="opacity-60"> - 6 min read </span>
							</h5>
							<h3 class="text-darkBlue font-medium text-2xl md:text-4xl">
								${title}
							</h3>
							<div>
								<h4 class="py-3 text-xl font-semibold">
									${subTitle}
								</h4>
								${html}
								<p>
									<span class="opacity-60">By</span>
									<span>${author?.name}</span>
									<span class="opacity-60"> - ${new Date(datePublished).toString()} </span>
								</p>
							</div>
						</div>
					</div>
            `;

			return (blogContent.innerHTML += article);
		});
	});
