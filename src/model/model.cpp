#include "model.h"

#include <assimp/Importer.hpp>
#include <assimp/scene.h>
#include <assimp/postprocess.h>

#include <map>

static constexpr int CACHE_MAX_SIZE = 5000; // ��󻺴���
static map<const string, vector<Mesh*>*> MODEL_CACHE;

static vector<Texture*> loadMaterialTextures(
	const aiMaterial* mat,
	const aiTextureType type,
	const string directory,
	const unsigned int start = 0
) {
	vector<Texture*> textures;
	for (unsigned int i = 0; i < mat->GetTextureCount(type); i++)
	{
		aiString str;
		mat->GetTexture(type, i, &str);
		Texture* texture = new Texture((directory + '/' + str.C_Str()).c_str());
		texture->unit = i + start;
		texture->type = type;
		texture->use();
		textures.push_back(texture);
	}

	return textures;
}

static Mesh* processMesh(aiMesh* mesh, const aiScene* scene, const string directory) {
	vector<Vertex> vertices;
	vector<unsigned int> indices;
	vector<Texture*> textures;

	for (unsigned int i = 0; i < mesh->mNumVertices; i++)
	{
		Vertex vertex;
		// ������λ�á����ߺ���������
		vertex.position = glm::vec3(mesh->mVertices[i].x, mesh->mVertices[i].y, mesh->mVertices[i].z);
		vertex.normal = glm::vec3(mesh->mNormals[i].x, mesh->mNormals[i].y, mesh->mNormals[i].z);
		vertex.texCoords = glm::vec2(0.0f, 0.0f);
		if (mesh->mTextureCoords[0]) {
			vertex.texCoords.x = mesh->mTextureCoords[0][i].x;
			vertex.texCoords.y = mesh->mTextureCoords[0][i].y;
		}

		vertices.push_back(vertex);
	}

	// ��������
	for (unsigned int i = 0; i < mesh->mNumFaces; i++) {
		aiFace face = mesh->mFaces[i];
		for (unsigned int j = 0; j < face.mNumIndices; j++)
			indices.push_back(face.mIndices[j]);
	}

	// �������
	if (mesh->mMaterialIndex >= 0)
	{
		aiMaterial* material = scene->mMaterials[mesh->mMaterialIndex];
		vector<Texture*> diffuseMaps = loadMaterialTextures(material, aiTextureType_DIFFUSE, directory);
		textures.insert(textures.end(), diffuseMaps.begin(), diffuseMaps.end());
		vector<Texture*> specularMaps = loadMaterialTextures(material, aiTextureType_SPECULAR, directory, textures.size());
		textures.insert(textures.end(), specularMaps.begin(), specularMaps.end());
	}

	return new Mesh(vertices, textures, indices);
}

static void processNode(
	aiNode* node,
	const aiScene* scene,
	vector<Mesh*>* const meshes,
	const string directory
) {
	unsigned int i;
	// ����ڵ����е���������еĻ���
	for (i = 0; i < node->mNumMeshes; i++) {
		meshes->push_back(processMesh(scene->mMeshes[node->mMeshes[i]], scene, directory));
	}
	// �������������ӽڵ��ظ���һ����
	for (i = 0; i < node->mNumChildren; i++) {
		processNode(node->mChildren[i], scene, meshes, directory);
	}
}

// ====================================================
void paintModel(const vector<Mesh*>* meshes, Shader* shader) {
	for (unsigned int i = 0; i < meshes->size(); i++) {
		meshes->at(i)->paint(shader);
	}
}

void paintModel(const string path, Shader* shader) {
	paintModel(loadModel(path), shader);
}

vector<Mesh*>* loadModel(const string path, unsigned int pFlags) {
	if (MODEL_CACHE.count(path)) {
		return MODEL_CACHE.at(path);
	}

	// �������õ���󻺴���, ���������
	if (MODEL_CACHE.size() >= CACHE_MAX_SIZE) {
		clearModelCache();
	}

	Assimp::Importer import;
	const aiScene* scene = import.ReadFile(path, pFlags);

	vector<Mesh*>* meshes = new vector<Mesh*>();

	if (!scene || scene->mFlags & AI_SCENE_FLAGS_INCOMPLETE || !scene->mRootNode)
	{
		cout << "ERROR::ASSIMP::" << import.GetErrorString() << endl;
	}
	else {
		processNode(scene->mRootNode, scene, meshes, path.substr(0, path.find_last_of('/')));
		MODEL_CACHE[path] = meshes;
	}

	return meshes;
}

bool deleteModelCache(const string path) {
	if (!MODEL_CACHE.count(path)) {
		return false;
	}

	vector<Mesh*>* meshes = MODEL_CACHE.at(path);
	for (unsigned i = 0; i < meshes->size(); i++) {
		delete meshes->at(i);
	}
	delete meshes;

	MODEL_CACHE.erase(path);

	return true;
}

void clearModelCache() {
	if (MODEL_CACHE.size() < 1) {
		return;
	}

	map<const string, vector<Mesh*>*>::iterator iter;
	for (iter = MODEL_CACHE.begin(); iter != MODEL_CACHE.end(); iter++) {
		vector<Mesh*>* meshes = iter->second;
		for (unsigned i = 0; i < meshes->size(); i++) {
			delete meshes->at(i);
		}
		delete meshes;
	}

	MODEL_CACHE.clear();
}

