#pragma once

#ifndef MODEL_H
#define MODEL_H

#include <assimp/Importer.hpp>
#include <assimp/scene.h>
#include <assimp/postprocess.h>

#include "mesh.h"
 
// ����ģ��
vector<Mesh*>* loadModel(const string path, unsigned int pFlags = aiProcess_Triangulate);
// �Ƴ�ģ�ͻ���
bool deleteModelCache(const char* path);
// ��ջ���
void clearModelCache();
// ͨ��meshs���ݻ���
void paintModel(vector<Mesh*>& meshs);

#endif