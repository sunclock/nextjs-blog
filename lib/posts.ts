import { remark } from 'remark'
import html from 'remark-html'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
export function getSortedPostsData() {
	// you can fetch the data from other sources, like an external API endpoint
	// const res = await fetch('..')
	// return res.json()
	// You can also query the database directly:
	// return databaseClient.query('SELECT posts...')

	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map(fileName => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '')

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName)
		const fileContents = fs.readFileSync(fullPath, 'utf8')

		// Use gray-matter to parse the post metadata section
		const matterResult: any = matter(fileContents)

		// Combine the data with the id
		return {
			id,
			...matterResult.data
		}
	})
	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory)
	return fileNames.map(fileName => {
		return {
			params: {
				id: fileName.replace(/\.md$/, '')
			}
		}
	})
}

// export async function getAllPostIds() {
// 	// Instead of the file system,
// 	// fetch post data from an external API endpoint
// 	const res = await fetch('..')
// 	const posts = await res.json()
// 	return posts.map(post => {
// 		return {
// 			params: {
// 				id: post.id
// 			}
// 		}
// 	})
// }

export async function getPostData(id: string | string[]) {
	const fullPath = path.join(postsDirectory, `${id}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents)

	// Use remark to convert markdown into HTML string
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content)
	const contentHtml = processedContent.toString()

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data
	}
}